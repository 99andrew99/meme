import React from "react";
import GlobalStyles from "./GlobalStyles";
import { Routes, Route, BrowserRouter } from "react-router-dom";

//페이지 임포트
import Signup from "./components/Signup";

function App() {
    return (
        <BrowserRouter>
            <GlobalStyles />
            <Routes>
                <Route path="/" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
