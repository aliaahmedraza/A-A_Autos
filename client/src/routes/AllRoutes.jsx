// import React from "react";
import { Routes, Route} from "react-router-dom";
import Login from "../pages/Login/Login.jsx";
import SignupPage from "../pages/SignUp/SignUp.jsx";
import ForgotPasswordPage from "../pages/ForgetPassword/ForgetPassword.jsx";
import UpdatePasswordPage from "../pages/UpdatePassword/UpdatePassword.jsx";
import UpdateProfile from "../pages/UpdateUserProfile/UpdateProfile.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import LandingPage from "../pages/LandingPage/LandingPage.jsx";
import About from "../pages/About/About.jsx";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes.jsx";
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
      <Route path="/forgot" element={<ForgotPasswordPage/>}/>
      <Route path="/updatepassword/:token" element={<UpdatePasswordPage/>}/>
      <Route path="/update" element={<UpdateProfile/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/about" element={<ProtectedRoutes><About/></ProtectedRoutes>}/>
      </Routes>
    </div>
  );
};

export default AllRoutes;
