import {createBrowserRouter, Navigate} from "react-router-dom";
import App from "../App.jsx";
import {Home} from "lucide-react";
import {useEffect} from "react";
import {CategoryPage} from "../pages/Category/CategoryPage.jsx";
import {ErrorPage} from "../pages/ErrorPage.jsx";
import {AboutPage} from "../pages/About/AboutPage.jsx";
import {HomePage} from "../pages/HomePage.jsx";
import {LoginPage} from "../pages/LoginPage.jsx";
import {ContactPage} from "../pages/About/ContactPage.jsx";
import {logoutAction} from "../pages/Logout.jsx";
import {CreatePage} from "../pages/CreatePage.jsx";
import {StorePage} from "../pages/About/StorePage.jsx";
import RegistrationFormTest from "../components/Form/RegistrationFormTest.jsx";
import {AdminPage} from "../pages/Admin/AdminPage.jsx";

const ErrorTriggerComponent = () => {
    useEffect(() => {
        throw new Error("Simulated 500 error");
    }, []);
    return null;
};

const router = createBrowserRouter([{
    path: "/",
    element: <App/>,
    children:
        [
            {
                path: "/trigger-error",
                element: <ErrorTriggerComponent/>
            },
            {
                path: "/",
                element: <HomePage/>
            },
            {
                path: "*",
                element: <Navigate to="/error" state={{status: 404}}/>
            },
            {
                path: "/error",
                element: <ErrorPage/>
            },
            {
                path: "/category",
                element: <CategoryPage/>
            },
            {
                path: "/about",
                element: <AboutPage/>
            },
            {
                path: "/contact",
                element: <ContactPage/>
            },
            {
                path: "/store",
                element: <StorePage/>//protected
            },
            {
                path: "/create",
                element: <CreatePage/>//protected
            },
            {
                path: "/register",
                element: <RegistrationFormTest/>
            },
            {
                path: "/login",
                element: <LoginPage/>
            },
            {
                path: "/admin",
                element: <AdminPage/>  //protected
             },
            {
                path: "/logout",
                action: logoutAction
            },

        ]
}])

export default router;