import * as React from "react"
import {ChakraProvider, theme,} from "@chakra-ui/react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./login";
import BookList from "./book-list";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

export const App = () => (

    <ChakraProvider theme={theme}>
        <Router>
            <Routes>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/book" element={<BookList/>}/>
                <Route path="/" element={<Login/>}/>
            </Routes>
        </Router>

    </ChakraProvider>


)
