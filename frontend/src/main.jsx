import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import './assets/css/productCardEffects.css'
import './components/TreeMenu/styles.css'
import router from "./router/router.jsx";
import {ChakraProvider} from "@chakra-ui/react";
import {BrowserRouter, RouterProvider} from "react-router-dom";
import {LoggerProvider} from "./utility/LoggerContext.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(


    <StrictMode>

        <QueryClientProvider client={queryClient}>
            <LoggerProvider>
                <ChakraProvider>
                    <RouterProvider router={router} />
                </ChakraProvider>
            </LoggerProvider>
        </QueryClientProvider >

    </StrictMode>,
)


