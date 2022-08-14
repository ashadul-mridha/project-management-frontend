import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';

const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Contact />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </>
    );
};

export default AppRouter;