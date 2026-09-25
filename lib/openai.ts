import OpenAI from "openai";

/**
 * Shared OpenAI client for AI-assisted features. Server-only. Set OPENAI_API_KEY
 * in the environment.
 *
 * Lazily constructed so the app still builds/runs when the key is absent.
 */
let client: OpenAI | undefined;

export function getOpenAI(): OpenAI {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set");
  }
  client ??= new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return client;
}
