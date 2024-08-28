import React from 'react'
import { Routes, Route } from "react-router-dom";
import Navbar from '../Pages/Navbar/Navbar';
import Home from '../Pages/Home/Home';
import Card from '../Pages/Card/Card';
import Nopage from '../Pages/Nopage/Nopage';
import Register from '../Pages/Auth/Register';
import Login from '../Pages/Auth/Login';
import ForgotPassword from '../Pages/Auth/ForgotPassword';
import ChangePassword from '../Pages/Auth/ChangePassword';
import User from '../Pages/User/User';
import Team from '../Pages/User/Team';
import OneUser from '../Pages/User/OneUser';
import OneTeam from '../Pages/User/OneTeam';
import AddUser from '../Pages/User/AddUser';
import Update from '../Pages/User/Update';
import Verify from '../Pages/User/Verify';

export default function Router() {

    return (
        <div className="router">
            <Navbar />
            <Routes>
                <Route index element={<Home />} />
                <Route path="/card" element={<Card />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgotpassword" element={<ForgotPassword />} />
                <Route path="/changepassword" element={<ChangePassword />} />
                <Route path="/users" element={<User />} />
                <Route path="/team" element={<Team />} />
                <Route path="/singleUser/:id" element={<OneUser />} />
                <Route path="/singleTeam/:id" element={<OneTeam />} />
                <Route path="/addUser/" element={<AddUser />} />
                <Route path="/updateUser/:id" element={<Update />} />
                <Route path="/verify" element={<Verify />} />

                <Route path="*" element={<Nopage />} />
            </Routes>
        </div>
    );
}
