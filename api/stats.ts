import { onRequestGet, onRequestOptions } from "../functions/api/stats";
import { createVercelHandler } from "./_adapter";

export const { GET, OPTIONS } = createVercelHandler({
  GET: onRequestGet,
  OPTIONS: onRequestOptions,
});
