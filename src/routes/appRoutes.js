import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/auth/Login';
import HomeLayout from '../components/Layout/HomeLayout';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';
import ProjectDetails from '../components/Project/ProjectDetails';
import AllTask from '../components/Task/AllTask';

const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={
                        <PrivateRoute redirectTo="/login">
                            <HomeLayout />
                        </PrivateRoute>
                        }
                    >
                    <Route path="/" element={<AllTask />} />
                    <Route path="/project/:id" element={<ProjectDetails />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
};

export default AppRouter;