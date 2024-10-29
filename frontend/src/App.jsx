import {useEffect, useState} from 'react'
import {Box, Button, useColorModeValue} from "@chakra-ui/react";
import {Navigate, Outlet,useNavigate,} from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import treeMenuData from "./components/TreeMenu/data.js";
import Footer from "./components/Footer.jsx";
import {useUserStore} from "./store/user.js";
import ErrorBoundary from "./pages/ErrorBoundary.jsx";
// TANSTACK REACT QUERY SUPPORT TOOLS
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

function App() {
    const [count, setCount] = useState(0)
    const {isLoggedIn, getToken, getTokenExpiration, setLogoutState} = useUserStore()
    const navigate = useNavigate();
    const timeout = 1000 * 60 * 60
    const token = getToken()

    useEffect(() => {

        if (!token) {
            return
        }

        if (token === "EXPIRED") {
            logoutAutomaticaly()
        }
        const duration = getTokenExpiration()

        setTimeout(() => {
            logoutAutomaticaly()
        }, duration)
    }, [token]);

    const isAuthenticated = () => {
        const userLogged = getToken()
        return userLogged ?? false;
    };

    const ProtectedRoute = ({children}) => {

        if (!isAuthenticated()) {
            return <Navigate to="/login" replace/>;
        }
        return children;
    };

    //TODO refactor
    const logoutAutomaticaly = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        setLogoutState(false)
        navigate('/login');
    }
    const ErrorTriggerComponent = () => {
        useEffect(() => {
            throw new Error("Simulated 500 error");
        }, []);
        return null;
    };

    return (
        <>
            <Box minH={"100vh"} bg={useColorModeValue("grey.100", 'gray.900')}>

                <NavBar treeMenuData={treeMenuData}/>

                <ErrorBoundary>
                <main>
                    <Outlet/>
                </main>

                <ReactQueryDevtools initialIsOpen={false}/>

                </ErrorBoundary>
                <Footer treeMenuData={treeMenuData}/>
            </Box>
        </>
    )
}

export default App
