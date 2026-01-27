// Simple AI-powered priority classifier
// Uses description + app/location to decide High | Medium | Normal
import { openai, ensureAIConfig } from "./ai";

export type Priority = "High" | "Medium" | "Low";

export async function classifyPriority(input: {
  description?: string | null;
  page?: string | null;
  app?: string | null;
}): Promise<Priority> {
  ensureAIConfig();
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const desc = (input.description ?? "").toString().trim();
  const page = (input.page ?? "").toString().trim();
  const app = (input.app ?? "").toString().trim();

  const prompt = `Classify ticket priority as exactly one of: High, Medium, Low.

Consider:
- Impact scope (many users, core flows, payments, crashes, data loss) -> High
- Blocking a single user or important feature, no workaround -> High
- Degraded experience or non-core bug with workaround -> Medium
- Cosmetic issues, questions, or minor inconveniences -> Low

Return just the one word with correct capitalization.

Description: ${desc || "(none)"}
App: ${app || "(unknown)"}
Location: ${page || "(unknown)"}`;

  try {
    const res = await openai.chat.completions.create({
      model,
      temperature: 0.2,
      messages: [
        { role: "system", content: "You classify ticket priority. Output only one of: High, Medium, Low." },
        { role: "user", content: prompt },
      ],
    });
    const text = res.choices?.[0]?.message?.content?.trim() || "";
    const norm = text.replace(/[^A-Za-z]/g, "").toLowerCase();
    if (norm === "high") return "High";
    if (norm === "medium") return "Medium";
    if (norm === "low") return "Low";
    return "Low";
  } catch {
    return "Low";
  }
}
