import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProjectDetails from './components/Project/ProjectDetails';
import AllTask from './components/Task/AllTask';

const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<AllTask />} />
                <Route path="/project/:id" element={<ProjectDetails />} />
            </Routes>
        </>
    );
};

export default AppRouter;