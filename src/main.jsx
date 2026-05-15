import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { IS_PAYMENT } from './utils/constants'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {IS_PAYMENT ? (
      <>
        <link rel="icon" type="image/svg+xml" href="/fav.svg" />
        <title>Payorio Payment Gateway</title>
        <App />
      </>
    ) : (
      <>
        <link rel="icon" type="image/svg+xml" href="/fav.svg" />
        <title>BETZONE</title>
        <App />
      </>
    )}
  </StrictMode>,
)
