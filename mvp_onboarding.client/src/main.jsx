import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
//import './index.css'
import 'semantic-ui-css/semantic.min.css';
import 'react-datepicker/dist/react-datepicker.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
