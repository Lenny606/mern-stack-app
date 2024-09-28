import {useEffect, useState} from 'react'
import {Box, Button, useColorModeValue} from "@chakra-ui/react";
import {Navigate, Route, Routes, useNavigate, useSubmit,} from "react-router-dom";
import {HomePage} from "./pages/HomePage.jsx";
import {CreatePage} from "./pages/CreatePage.jsx";
import {CategoryPage} from "./pages/Category/CategoryPage.jsx";
import {LoginPage} from "./pages/LoginPage.jsx";
import NavBar from "./components/NavBar.jsx";
import treeMenuData from "./components/TreeMenu/data.js";
import {AboutPage} from "./pages/About/AboutPage.jsx";
import {AdminPage} from "./pages/Admin/AdminPage.jsx";
import {ContactPage} from "./pages/About/ContactPage.jsx";
import {StorePage} from "./pages/About/StorePage.jsx";
import Footer from "./components/Footer.jsx";
import RegistrationFormTest from "./components/Form/RegistrationFormTest.jsx";
import {useUserStore} from "./store/user.js";
import {logoutAction} from "./pages/Logout.jsx";

function App() {
    const [count, setCount] = useState(0)
    const {isLoggedIn, getToken,getTokenExpiration, setLogoutState} = useUserStore()
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
        console.log(isAuthenticated())
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

    return (

        <Box minH={"100vh"} bg={useColorModeValue("grey.100", 'gray.900')}>
            {/*   NAVBAR */}
            <NavBar treeMenuData={treeMenuData}/>
            <Routes>
                <Route path={"/"} element={<HomePage/>}/>
                <Route path={"/category"} element={<CategoryPage/>}/>
                <Route path={"/about"} element={<AboutPage/>}/>
                <Route path={"/contact"} element={<ContactPage/>}/>
                <Route path={"/store"} element={<StorePage/>}/>
                <Route path={"/create"} element={
                    <ProtectedRoute>
                        <CreatePage/>
                    </ProtectedRoute>}/>
                <Route path={"/login"} element={<LoginPage/>}/>
                {/*<Route path={"/logout"} action={logoutAction}/>*/}
                <Route path={"/register"} element={<RegistrationFormTest/>}/>
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminPage/>
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <Footer/>

        </Box>

    )
}

export default App
