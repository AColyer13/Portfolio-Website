import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import emailjs from '@emailjs/browser'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { applyTheme, loadStoredTheme } from './theme/colorScheme'
import './index.css'
import App from './App.tsx'

applyTheme(loadStoredTheme() ?? 'system')

emailjs.init({ publicKey: 'S590pep4moIqEJb8m' })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
