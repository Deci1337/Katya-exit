import { StrictMode, Suspense, lazy, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ContentProvider } from '@/content/ContentContext'
import { defaultContent, mergeContent, type Content } from '@/content/defaults'

const Admin = lazy(() => import('./admin/Admin.tsx'))
const isAdmin = window.location.pathname.replace(/\/+$/, '') === '/zakulisye'

/** Loads edited content; falls back to built-in texts if the API is slow or unavailable. */
function Site() {
  const [content, setContent] = useState<Content | null>(null)

  useEffect(() => {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 2500)
    fetch('/api/content', { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => setContent(mergeContent(data)))
      .catch(() => setContent(defaultContent))
      .finally(() => clearTimeout(timer))
    return () => { clearTimeout(timer); ctrl.abort() }
  }, [])

  if (!content) return <div className="min-h-screen bg-milk" />
  return (
    <ContentProvider content={content}>
      <App />
    </ContentProvider>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isAdmin ? (
      <Suspense fallback={<div className="min-h-screen bg-milk" />}>
        <Admin />
      </Suspense>
    ) : (
      <Site />
    )}
  </StrictMode>,
)
