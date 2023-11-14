import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Routes } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { zUserRoute } from '../routes/route';
import Header from '../components/header';
const App = () => {
    return (
        <>
            <Router>
                <div style={{ position: 'relative' }}>
                    <Header />
                    <Routes>
                        {zUserRoute.map((route, idx) => (
                            <>
                                <Route exact key={idx} path={route.link} element={route.element} />
                            </>
                        ))}
                    </Routes>
                    <Toaster position={'top-right'} containerStyle={{ zIndex: 999 }} />
                </div>
            </Router>
        </>
    );
}


export default App