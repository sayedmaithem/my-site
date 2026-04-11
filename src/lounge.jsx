import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LoungeMenu from './components/LoungeMenu'

createRoot(document.getElementById('lounge-root')).render(
  <StrictMode>
    <LoungeMenu />
  </StrictMode>,
)
