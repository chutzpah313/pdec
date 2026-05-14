import { onRequestOptions, onRequestPost } from "../functions/api/feedback";
import { createVercelHandler } from "./_adapter";

export const { POST, OPTIONS } = createVercelHandler({
  POST: onRequestPost,
  OPTIONS: onRequestOptions,
});
