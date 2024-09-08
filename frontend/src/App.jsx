import {useState} from 'react'
import {Box, Button, useColorModeValue} from "@chakra-ui/react";
import {Route, Routes} from "react-router-dom";
import { HomePage } from "./pages/HomePage.jsx";
import { CreatePage } from "./pages/CreatePage.jsx";
import NavBar from "./components/NavBar.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (

        <Box minH={"100vh"}  bg={useColorModeValue("grey.100", 'gray.900')}>
            {/*   NAVBAR */}
            <NavBar />
            <Routes>
                <Route path={"/"} element={<HomePage/>} />
                <Route path={"/create"} element={<CreatePage/>} />
            </Routes>

        </Box>

    )
}

export default App
