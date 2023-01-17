import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/auth/Login';
import HomeLayout from '../components/Layout/HomeLayout';
import PrivateRoute from '../utils/PrivateRoute/PrivateRoute';
import ProjectDetails from '../components/Project/ProjectDetails';
import AllTask from '../components/Task/AllTask';
import SignUp from '../components/auth/SignUp';
import TodayTask from '../components/Task/TodayTask';
import UpcommingTask from '../components/Task/UpcommingTask';
import AddUser from '../components/user/Adduser';
import ProfilePage from '../components/user/ProfilePage';
import Alluser from '../components/user/Alluser';
import AllMeeting from '../components/meeting/AllMeeting';
import ViewMeeting from '../components/meeting/ViewMeeting';
import EnterEmail from '../components/auth/ResetPassword/EnterEmail';
import UpdatePassword from '../components/auth/ResetPassword/UpdatePassword';
import AllBooking from '../components/bookingGallary/AllBooking';
import ViewBooking from '../components/bookingGallary/ViewBooking';

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
                    <Route path="/today" element={<TodayTask />} />
                    <Route path="/upcomming" element={<UpcommingTask />} />
                    <Route path="/adduser" element={<AddUser />} />
                    <Route path="/alluser" element={<Alluser />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/project/:id" element={<ProjectDetails />} /> 
                    <Route path="/meeting/all" element={<AllMeeting />} />
                    <Route path="/meeting/view" element={<ViewMeeting />} />
                    <Route path="/booking/all" element={<AllBooking />} />
                    <Route path="/booking/view" element={<ViewBooking />} />
                </Route>
                
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot/password" element={<EnterEmail />} />
                <Route path="/reset/password" element={<UpdatePassword />} />
            </Routes>
        </>
    );
};

export default AppRouter;