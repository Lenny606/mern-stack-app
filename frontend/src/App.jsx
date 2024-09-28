import {useState} from 'react'
import {Box, Button, useColorModeValue} from "@chakra-ui/react";
import {Navigate, Route, Routes,} from "react-router-dom";
import { HomePage } from "./pages/HomePage.jsx";
import { CreatePage } from "./pages/CreatePage.jsx";
import { CategoryPage } from "./pages/Category/CategoryPage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
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
    const {isLogged, isLoggedIn, getToken} = useUserStore()

    // const userLogged = isLoggedIn()
    // console.log(userLogged)
    const isAuthenticated = async () => {
        // This should be replaced with your actual authentication logic
        // return localStorage.getItem('token') !== null;
        const userLogged = await isLoggedIn()
        console.log(userLogged)
        return false;
    };



    const ProtectedRoute = ({ children }) => {
        if (!isAuthenticated()) {
            // Redirect to login if not authenticated
            return <Navigate to="/login" replace />;
        }
        return children;
    };

    return (

        <Box minH={"100vh"}  bg={useColorModeValue("grey.100", 'gray.900')}>
            {/*   NAVBAR */}
            <NavBar treeMenuData={treeMenuData}/>
            <Routes>
                <Route path={"/"} element={<HomePage/>} />
                <Route path={"/category"} element={<CategoryPage/>} />
                <Route path={"/about"} element={<AboutPage/>} />
                <Route path={"/contact"} element={<ContactPage/>} />
                <Route path={"/store"} element={<StorePage/>} />
                <Route path={"/create"} element={<CreatePage/>} />
                <Route path={"/login"} element={<LoginPage/>} />
                {/*<Route path={"/logout"} action={logoutAction}/>*/}
                <Route path={"/register"} element={<RegistrationFormTest/>} />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <Footer />

        </Box>

    )
}

export default App
