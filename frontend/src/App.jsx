import {useState} from 'react'
import {Box, Button} from "@chakra-ui/react";
import {Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/HomePage.jsx";
import {CreatePage} from "./pages/CreatePage.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (

        <Box minH={"100vh"}>
            {/*   NAVBAR */}
            <Routes>
                <Route path={"/"} element={< HomePage/>}></Route>
                <Route path={"/create"} element={< CreatePage/>}></Route>
            </Routes>
        </Box>

    )
}

export default App
