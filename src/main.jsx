import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './modules/lib/store.js'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { OrderProvider } from './modules/custmhook/OrderContext.jsx';
import { EmailProvider } from './modules/custmhook/EmailContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <Provider store={store}> 
     <EmailProvider>
    <OrderProvider>
    <App />
    </OrderProvider>
    </EmailProvider>
   

     </Provider>

 
    </BrowserRouter>

  </StrictMode>,
)
