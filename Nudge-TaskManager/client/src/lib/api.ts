// client/src/lib/api.ts
export const API_BASE =
  (import.meta && (import.meta as ImportMeta).env?.VITE_API_URL) ||
  "https://nudge-murex.vercel.app";
