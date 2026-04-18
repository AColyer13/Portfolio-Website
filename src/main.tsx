import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// #region agent log
window.addEventListener('error', (ev) => {
  fetch('http://127.0.0.1:7463/ingest/a02f0bfb-867b-4f75-8328-dcee3542df58',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1fc8d4'},body:JSON.stringify({sessionId:'1fc8d4',location:'main.tsx:window-error',message:'uncaught error',data:{msg:String(ev.message),filename:ev.filename,lineno:ev.lineno},timestamp:Date.now(),hypothesisId:'H3',runId:'pre-fix'})}).catch(()=>{})
})
fetch('http://127.0.0.1:7463/ingest/a02f0bfb-867b-4f75-8328-dcee3542df58',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1fc8d4'},body:JSON.stringify({sessionId:'1fc8d4',location:'main.tsx:entry',message:'module executing',data:{baseUrl:import.meta.env.BASE_URL,href:typeof location!=='undefined'?location.href:'',pathname:typeof location!=='undefined'?location.pathname:'',rootExists:!!document.getElementById('root')},timestamp:Date.now(),hypothesisId:'H1',runId:'pre-fix'})}).catch(()=>{})
// #endregion

const rootEl = document.getElementById('root')
// #region agent log
fetch('http://127.0.0.1:7463/ingest/a02f0bfb-867b-4f75-8328-dcee3542df58',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1fc8d4'},body:JSON.stringify({sessionId:'1fc8d4',location:'main.tsx:root',message:'before createRoot',data:{rootEl:!!rootEl},timestamp:Date.now(),hypothesisId:'H2',runId:'pre-fix'})}).catch(()=>{})
// #endregion

try {
  createRoot(rootEl!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  // #region agent log
  fetch('http://127.0.0.1:7463/ingest/a02f0bfb-867b-4f75-8328-dcee3542df58',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1fc8d4'},body:JSON.stringify({sessionId:'1fc8d4',location:'main.tsx:after-render',message:'createRoot render returned',data:{ok:true},timestamp:Date.now(),hypothesisId:'H3',runId:'pre-fix'})}).catch(()=>{})
  // #endregion
} catch (e) {
  // #region agent log
  fetch('http://127.0.0.1:7463/ingest/a02f0bfb-867b-4f75-8328-dcee3542df58',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'1fc8d4'},body:JSON.stringify({sessionId:'1fc8d4',location:'main.tsx:catch',message:'createRoot/render threw',data:{err:String(e)},timestamp:Date.now(),hypothesisId:'H3',runId:'pre-fix'})}).catch(()=>{})
  // #endregion
  throw e
}
