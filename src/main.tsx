import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DesignMode, createLocalSink, revertLocalEdit } from 'silt-design-mode'
import './index.css'
import App from './App.tsx'

/**
 * Design mode wraps the app in development only — it is a tool for working on
 * the page, not part of it, and there is nothing for it to talk to in a build.
 *
 * `anchor="viewport"` because the default pins the pill inside the wrapped box,
 * which on a page taller than the screen parks it at the bottom of the document
 * where nobody scrolls to find it.
 */
const app = import.meta.env.DEV ? (
  <DesignMode
    anchor="viewport"
    onRevert={revertLocalEdit}
    onSend={createLocalSink({ repoRoot: __REPO_ROOT__ })}
    repoRoot={__REPO_ROOT__}
  >
    <App />
  </DesignMode>
) : (
  <App />
)

createRoot(document.getElementById('root')!).render(<StrictMode>{app}</StrictMode>)
