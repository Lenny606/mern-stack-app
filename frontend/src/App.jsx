import {useState} from 'react'
import {Box, Button, useColorModeValue} from "@chakra-ui/react";
import {Route, Routes} from "react-router-dom";
import { HomePage } from "./pages/HomePage.jsx";
import { CreatePage } from "./pages/CreatePage.jsx";
import { CategoryPage } from "./pages/CategoryPage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import NavBar from "./components/NavBar.jsx";
import treeMenuData from "./components/TreeMenu/data.js";
import {AboutPage} from "./pages/About/AboutPage.jsx";
import {ContactPage} from "./pages/About/ContactPage.jsx";
import {StorePage} from "./pages/About/StorePage.jsx";

function App() {
    const [count, setCount] = useState(0)

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
            </Routes>

        </Box>

    )
}

export default App
