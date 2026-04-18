import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import emailjs from '@emailjs/browser'
import './index.css'
import App from './App.tsx'

emailjs.init({ publicKey: 'S590pep4moIqEJb8m' })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
