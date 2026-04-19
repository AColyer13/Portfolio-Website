import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import emailjs from '@emailjs/browser'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { applyTheme, loadStoredPreference, resolveTheme } from './theme/colorScheme'
import './index.css'
import App from './App.tsx'

applyTheme(resolveTheme(loadStoredPreference() ?? 'system'))

emailjs.init({ publicKey: 'S590pep4moIqEJb8m' })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
