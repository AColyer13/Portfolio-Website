import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import emailjs from '@emailjs/browser'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { initTheme } from './theme/colorScheme'
import { initScrollHeaderMode } from './utils/scrollHeader'
import './index.css'
import App from './App.tsx'

if (import.meta.env.PROD) {
  registerSW({ immediate: true })
}

initTheme()
initScrollHeaderMode()

emailjs.init({ publicKey: 'S590pep4moIqEJb8m' })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
