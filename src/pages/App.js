import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Routes } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { zUserRoute } from '../routes/route';
const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    {zUserRoute.map((route, idx) => (
                        <>
                            <Route exact key={idx} path={route.link} element={route.element} />
                        </>
                    ))}

                </Routes>
                <Toaster position={'top-right'} containerStyle={{ zIndex: 999 }} />
            </Router>
        </>
    );
}


export default App