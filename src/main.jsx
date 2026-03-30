import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Cadastrar from './components/Cadastrar.jsx'
import Login from './components/Login.jsx'
import Formulario from './components/Formulario.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
