import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { OrderProvider } from './modules/custmhook/OrderContext.jsx';
import { EmailProvider } from './modules/custmhook/EmailContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <EmailProvider>
    <OrderProvider>
    <App />
    </OrderProvider>
    </EmailProvider>
   
 
    </BrowserRouter>

  </StrictMode>,
)
