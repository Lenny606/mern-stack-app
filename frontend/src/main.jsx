import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './components/TreeMenu/styles.css'
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom";
import {LoggerProvider} from "./utility/LoggerContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/*wrap with react router */}
        <BrowserRouter>
            <LoggerProvider>
                <ChakraProvider>
                    <App/>
                </ChakraProvider>
            </LoggerProvider>
        </BrowserRouter>
    </StrictMode>,
)
