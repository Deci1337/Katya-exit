import { isAuthorized, json, readContent, writeContent, StorageNotConfigured } from './_lib.js';

const MAX_BYTES = 300_000;

export async function GET() {
  try {
    const data = await readContent();
    return json(data, 200, { 'cache-control': 'public, s-maxage=15, stale-while-revalidate=120' });
  } catch {
    return json(null, 200, { 'cache-control': 'no-store' });
  }
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) return json({ error: 'unauthorized' }, 401);

  const text = await req.text();
  if (text.length > MAX_BYTES) return json({ error: 'too-large' }, 413);

  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return json({ error: 'bad-json' }, 400);
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return json({ error: 'bad-shape' }, 400);

  try {
    await writeContent(data);
    return json({ ok: true });
  } catch (e) {
    if (e instanceof StorageNotConfigured) return json({ error: 'storage-not-configured' }, 500);
    return json({ error: 'save-failed' }, 500);
  }
}
