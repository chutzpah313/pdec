import { onRequestGet, onRequestOptions } from "../functions/api/health";
import { createVercelHandler } from "./_adapter";

export const { GET, OPTIONS } = createVercelHandler({
  GET: onRequestGet,
  OPTIONS: onRequestOptions,
});
