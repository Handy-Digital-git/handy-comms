import OpenAI from "openai";

// Singleton OpenAI client. Requires OPENAI_API_KEY in env.
export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export function ensureAIConfig() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY. Add it to your .env.local");
  }
}
