import type { Env } from "../functions/_lib/types";

declare const process: { env: Record<string, string | undefined> };

type VercelCompatibleHandler = (ctx: { request: Request; env: Env }) => Promise<Response> | Response;

type StoredValue = {
  value: string;
  expiresAt: number | null;
};

const store = new Map<string, StoredValue>();

function isExpired(entry: StoredValue): boolean {
  return entry.expiresAt !== null && entry.expiresAt <= Date.now();
}

const memoryKv = {
  async get(key: string, type?: "json" | "text"): Promise<unknown | null> {
    const entry = store.get(key);
    if (!entry) return null;
    if (isExpired(entry)) {
      store.delete(key);
      return null;
    }
    if (type === "json") return JSON.parse(entry.value);
    return entry.value;
  },
  async put(key: string, value: string, options?: { expirationTtl?: number }) {
    const expiresAt = options?.expirationTtl
      ? Date.now() + options.expirationTtl * 1000
      : null;
    store.set(key, { value, expiresAt });
  },
};

function createEnv(): Env {
  return {
    PDEC_KV: memoryKv as unknown as Env["PDEC_KV"],
    XPOSEDORNOT_API_KEY: process.env.XPOSEDORNOT_API_KEY,
    HIBP_API_KEY: process.env.HIBP_API_KEY,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
  };
}

function methodNotAllowed(): Response {
  return new Response(JSON.stringify({ error: "Method not allowed." }), {
    status: 405,
    headers: {
      "content-type": "application/json; charset=utf-8",
      allow: "GET,POST,OPTIONS",
    },
  });
}

export function createVercelHandler(handlers: {
  GET?: VercelCompatibleHandler;
  POST?: VercelCompatibleHandler;
  OPTIONS?: VercelCompatibleHandler;
}) {
  async function invoke(request: Request, handler?: VercelCompatibleHandler): Promise<Response> {
    if (!handler) return methodNotAllowed();
    return handler({ request, env: createEnv() });
  }

  return {
    GET: (request: Request) => invoke(request, handlers.GET),
    POST: (request: Request) => invoke(request, handlers.POST),
    OPTIONS: (request: Request) => invoke(request, handlers.OPTIONS),
  };
}
