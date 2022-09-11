import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/auth/Login';
import HomeLayout from '../components/Layout/HomeLayout';
import PrivateRoute from '../utils/PrivateRoute/PrivateRoute';
import ProjectDetails from '../components/Project/ProjectDetails';
import AllTask from '../components/Task/AllTask';
import SignUp from '../components/auth/SignUp';

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
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </>
    );
};

export default AppRouter;