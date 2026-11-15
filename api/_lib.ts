import { createHmac, timingSafeEqual } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { put, list, del } from '@vercel/blob';

const TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const KEEP_VERSIONS = 20;
const LOCAL_DIR = path.join(process.cwd(), '.data');

const isVercel = () => process.env.VERCEL === '1';
const useBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export class StorageNotConfigured extends Error {}

/** Locally (vite dev) the password falls back to "test"; on Vercel it must be set. */
export function getPassword(): string | null {
  return process.env.ADMIN_PASSWORD || (isVercel() ? null : 'test');
}

export function safeEqual(a: string, b: string): boolean {
  const A = Buffer.from(a);
  const B = Buffer.from(b);
  return A.length === B.length && timingSafeEqual(A, B);
}

const sign = (payload: string, secret: string) =>
  createHmac('sha256', secret).update(payload).digest('base64url');

export function issueToken(password: string): string {
  const exp = String(Date.now() + TOKEN_TTL_MS);
  return `${exp}.${sign(exp, password)}`;
}

export function isAuthorized(req: Request): boolean {
  const password = getPassword();
  if (!password) return false;
  const token = (req.headers.get('authorization') ?? '').replace(/^Bearer\s+/i, '');
  const [exp, sig] = token.split('.');
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return safeEqual(sig, sign(exp, password));
}

export const json = (data: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...headers },
  });

const newestFirst = (a: { uploadedAt: Date }, b: { uploadedAt: Date }) =>
  new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();

export async function readContent(): Promise<unknown | null> {
  if (useBlob()) {
    const { blobs } = await list({ prefix: 'content/' });
    if (blobs.length === 0) return null;
    const latest = [...blobs].sort(newestFirst)[0];
    const res = await fetch(latest.url);
    return res.ok ? res.json() : null;
  }
  try {
    return JSON.parse(await fs.readFile(path.join(LOCAL_DIR, 'content.json'), 'utf8'));
  } catch {
    return null;
  }
}

/** Every save is a new immutable file; older versions beyond KEEP_VERSIONS are pruned. */
export async function writeContent(data: unknown): Promise<void> {
  const body = JSON.stringify(data);
  if (useBlob()) {
    await put(`content/${Date.now()}.json`, body, {
      access: 'public',
      addRandomSuffix: false,
      contentType: 'application/json',
    });
    const { blobs } = await list({ prefix: 'content/' });
    const stale = [...blobs].sort(newestFirst).slice(KEEP_VERSIONS).map((b) => b.url);
    if (stale.length) await del(stale);
    return;
  }
  if (isVercel()) throw new StorageNotConfigured();
  await fs.mkdir(LOCAL_DIR, { recursive: true });
  await fs.writeFile(path.join(LOCAL_DIR, 'content.json'), body);
}

const EXT: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
export const IMAGE_TYPES = Object.keys(EXT);

export async function saveImage(buf: Buffer, type: string): Promise<string> {
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${EXT[type]}`;
  if (useBlob()) {
    const blob = await put(`images/${name}`, buf, { access: 'public', contentType: type });
    return blob.url;
  }
  if (isVercel()) throw new StorageNotConfigured();
  const dir = path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), buf);
  return `/uploads/${name}`;
}
