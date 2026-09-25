/**
 * Lightweight persistent key-value storage.
 *
 * Re-exports the default `@vercel/kv` client, which reads its connection details
 * (KV_REST_API_URL / KV_REST_API_TOKEN) from the environment. On Vercel these are
 * injected automatically once a KV / Upstash Redis store is linked to the project.
 */
export { kv } from "@vercel/kv";
