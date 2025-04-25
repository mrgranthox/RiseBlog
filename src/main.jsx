
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/context.jsx'
import { NetworkProvider } from './utils/NetworkStatus.jsx'

createRoot(document.getElementById('root')).render(
<NetworkProvider>
<BrowserRouter>
            <AppContextProvider>
                <App />
            </AppContextProvider>
        </BrowserRouter>
</NetworkProvider>        


)
