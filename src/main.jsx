import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Cadastrar from './components/Cadastrar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Cadastrar />
  </StrictMode>
)
