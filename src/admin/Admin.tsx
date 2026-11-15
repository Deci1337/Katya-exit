import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { Check, ExternalLink, Loader2, LogOut, Undo2 } from 'lucide-react';
import App from '@/App';
import { ContentProvider } from '@/content/ContentContext';
import { mergeContent, setAt, type Content } from '@/content/defaults';
import { cn } from '@/lib/utils';

const TOKEN_KEY = 'zakulisye-token';

const storage = {
  get: () => { try { return localStorage.getItem(TOKEN_KEY); } catch { return null; } },
  set: (v: string) => { try { localStorage.setItem(TOKEN_KEY, v); } catch { /* private mode */ } },
  clear: () => { try { localStorage.removeItem(TOKEN_KEY); } catch { /* private mode */ } },
};

const ERRORS: Record<string, string> = {
  'wrong-password': 'Неверный пароль',
  'not-configured': 'Пароль ещё не задан на сервере (ADMIN_PASSWORD)',
  'storage-not-configured': 'Хранилище не подключено (Vercel Blob)',
  unauthorized: 'Сессия истекла — войдите снова',
};

/** Downscale to max 1800px and re-encode as JPEG so uploads stay small. */
async function compressImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const ratio = Math.min(1, 1800 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * ratio);
  canvas.height = Math.round(bitmap.height * ratio);
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('encode'))), 'image/jpeg', 0.86)
  );
}

function Login({ onLogin, notice }: { onLogin: (token: string) => void; notice?: string }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(notice ?? '');
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.token) onLogin(data.token);
      else setError(ERRORS[data.error] ?? 'Не удалось войти');
    } catch {
      setError('Нет связи с сервером');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-milk px-5">
      <form onSubmit={submit} className="w-full max-w-sm">
        <p className="eyebrow">Только для своих</p>
        <h1 className="mt-6 text-6xl leading-none text-cocoa">Закулисье</h1>
        <p className="mt-4 text-[15px] text-cocoa/70">Здесь можно поменять тексты и фотографии на сайте.</p>
        <label className="mt-10 block text-sm text-cocoa/70" htmlFor="password">Пароль</label>
        <input
          id="password"
          type="password"
          autoFocus
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 h-12 w-full rounded-xl border border-cocoa/20 bg-milk-50 px-4 text-cocoa outline-none transition-colors focus:border-wine"
        />
        {error && <p className="mt-3 text-sm text-wine">{error}</p>}
        <button
          type="submit"
          disabled={busy || !password}
          className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-wine font-medium text-milk transition-colors hover:bg-wine-700 disabled:opacity-50"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Войти
        </button>
      </form>
    </main>
  );
}

export default function Admin() {
  const [token, setToken] = useState<string | null>(storage.get);
  const [notice, setNotice] = useState('');
  const [saved, setSaved] = useState<Content | null>(null);
  const [draft, setDraftState] = useState<Content | null>(null);
  const draftRef = useRef<Content | null>(null);
  const setDraft = (next: Content | null) => { draftRef.current = next; setDraftState(next); };
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [error, setError] = useState('');
  // typing = text is being edited but not committed yet (commit happens on blur)
  const [typing, setTyping] = useState(false);
  const dirty = Boolean(saved && draft && saved !== draft);
  const showSave = dirty || typing || status === 'saving';

  useEffect(() => {
    const onInput = (e: Event) => { if ((e.target as HTMLElement).closest?.('.editable')) setTyping(true); };
    const onFocusOut = () => setTyping(false);
    document.addEventListener('input', onInput);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('input', onInput);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  useEffect(() => {
    document.title = 'Закулисье';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  useEffect(() => {
    if (!token || saved) return;
    fetch(`/api/content?t=${Date.now()}`, { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null)
      .then((data) => {
        const content = mergeContent(data);
        setSaved(content);
        setDraft(content);
      });
  }, [token, saved]);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => { if (dirty) e.preventDefault(); };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  // In edit mode links must not navigate away
  useEffect(() => {
    const block = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href]');
      if (a && !a.closest('[data-admin-bar]') && !a.getAttribute('href')?.startsWith('#')) e.preventDefault();
    };
    document.addEventListener('click', block, true);
    return () => document.removeEventListener('click', block, true);
  }, []);

  const logout = (message = '') => {
    storage.clear();
    setToken(null);
    setNotice(message);
  };

  const set = useCallback((path: string, value: unknown) => {
    if (!draftRef.current) return;
    const next = setAt(draftRef.current, path, value);
    draftRef.current = next;
    setDraftState(next);
    setStatus('idle');
  }, []);

  const upload = useCallback(async (file: File) => {
    const body = await compressImage(file);
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { authorization: `Bearer ${token}`, 'content-type': 'image/jpeg' },
      body,
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 401) logout(ERRORS.unauthorized);
    if (!res.ok || !data.url) throw new Error(data.error ?? 'upload');
    return data.url as string;
  }, [token]);

  const save = async () => {
    // blurring commits the text being edited right now (synchronously, via set → draftRef)
    (document.activeElement as HTMLElement | null)?.blur?.();
    const current = draftRef.current;
    if (!current) return;
    setStatus('saving');
    setError('');
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify(current),
    }).catch(() => null);
    const data = await res?.json().catch(() => ({}));
    if (res?.ok) {
      setSaved(current);
      setStatus('saved');
    } else {
      setStatus('error');
      setError(ERRORS[data?.error] ?? 'Не удалось сохранить');
      if (res?.status === 401) logout(ERRORS.unauthorized);
    }
  };

  const revert = () => {
    if (saved && window.confirm('Отменить все несохранённые изменения?')) setDraft(saved);
  };

  if (!token) return <Login onLogin={(t) => { storage.set(t); setToken(t); setNotice(''); }} notice={notice} />;

  if (!draft) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-milk text-cocoa/60">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <div data-editing>
      <ContentProvider content={draft} editing set={set} upload={upload}>
        <App />
      </ContentProvider>

      <div
        data-admin-bar
        className="fixed inset-x-3 bottom-3 z-[60] mx-auto flex max-w-3xl flex-wrap items-center gap-2 rounded-2xl bg-cocoa-900/95 p-2 pl-4 text-sm text-milk shadow-2xl backdrop-blur sm:bottom-5"
      >
        <span className="font-display text-xl">Закулисье</span>
        <span className={cn('mr-auto text-xs', status === 'error' ? 'text-[#F3B4BF]' : 'text-milk/60')}>
          {status === 'saving' && 'Сохраняю…'}
          {status === 'error' && error}
          {status === 'saved' && !dirty && 'Сохранено, сайт обновится в течение минуты'}
          {status === 'idle' && (showSave ? 'Есть несохранённые изменения' : 'Нажмите на текст или фото, чтобы изменить')}
        </span>
        {dirty && (
          <button type="button" onClick={revert} className="inline-flex h-10 items-center gap-1 rounded-full px-3 text-milk/75 hover:text-milk" title="Отменить изменения">
            <Undo2 className="h-4 w-4" strokeWidth={1.5} />
            <span className="hidden sm:inline">Отменить</span>
          </button>
        )}
        <a href="/" target="_blank" rel="noopener" className="inline-flex h-10 items-center gap-1 rounded-full px-3 text-milk/75 hover:text-milk" title="Открыть сайт">
          <ExternalLink className="h-4 w-4" strokeWidth={1.5} />
          <span className="hidden sm:inline">Сайт</span>
        </a>
        <button type="button" onClick={() => logout()} className="inline-flex h-10 items-center rounded-full px-3 text-milk/75 hover:text-milk" title="Выйти">
          <LogOut className="h-4 w-4" strokeWidth={1.5} />
        </button>
        {showSave && (
          <button
            type="button"
            // keep focus in the text being edited; save() blurs it itself so the edit is committed first
            onMouseDown={(e) => e.preventDefault()}
            onClick={save}
            disabled={status === 'saving'}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-milk px-5 font-medium text-cocoa transition-colors hover:bg-milk-50 disabled:opacity-50"
          >
            {status === 'saving' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" strokeWidth={1.5} />}
            Сохранить
          </button>
        )}
      </div>
    </div>
  );
}
