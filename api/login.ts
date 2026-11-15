import { getPassword, issueToken, json, safeEqual } from './_lib.js';

export async function POST(req: Request) {
  const password = getPassword();
  if (!password) return json({ error: 'not-configured' }, 500);

  let body: { password?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return json({ error: 'bad-request' }, 400);
  }

  // Slow down guessing
  await new Promise((r) => setTimeout(r, 400));

  if (typeof body.password !== 'string' || !safeEqual(body.password, password)) {
    return json({ error: 'wrong-password' }, 401);
  }
  return json({ token: issueToken(password) });
}
