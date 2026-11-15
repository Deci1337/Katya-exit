import { IMAGE_TYPES, isAuthorized, json, saveImage, StorageNotConfigured } from './_lib.js';

const MAX_BYTES = 4_000_000;

export async function POST(req: Request) {
  if (!isAuthorized(req)) return json({ error: 'unauthorized' }, 401);

  const type = (req.headers.get('content-type') ?? '').split(';')[0].trim();
  if (!IMAGE_TYPES.includes(type)) return json({ error: 'unsupported-type' }, 415);

  const buf = Buffer.from(await req.arrayBuffer());
  if (buf.length === 0) return json({ error: 'empty' }, 400);
  if (buf.length > MAX_BYTES) return json({ error: 'too-large' }, 413);

  try {
    return json({ url: await saveImage(buf, type) });
  } catch (e) {
    if (e instanceof StorageNotConfigured) return json({ error: 'storage-not-configured' }, 500);
    return json({ error: 'upload-failed' }, 500);
  }
}
