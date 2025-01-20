import { Children, useEffect, useState } from "react";
// import { motion } from "motion/react";
import FloatingShapes from "./components/FloatingShapes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import { Routes, Route, Navigate,  } from "react-router-dom";
import {userAuthStore} from "./store/authStore.js"
import LoadingSpinner from "./components/LoadingSpinner.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import { ToastContainer } from 'react-toastify';

import "./App.css";
import DashBoard from "./pages/DashBoard.jsx";


// Protected route that requires authentication
const ProtectedRoute=({children})=>{

  const {isAuthenticated,user}= userAuthStore();

  if(!isAuthenticated){
    return <Navigate to="/login" replace />
  }
if(!user.isverified){
  return <Navigate to ="/verify-email" replace />
}

else return children
}



//Redirect the page to home page if authenticated
const RedirectAuthenticatedUser =({children})=>{
  const {isAuthenticated,user}=userAuthStore()
  if(isAuthenticated && user){
    console.log(isAuthenticated)
    return <Navigate to="/" replace />
  }

  else return children
}



function App() {

  const { checkAuth,isCheckingAuth}= userAuthStore();
  useEffect(() => {
    checkAuth(); // Ensures authentication check runs on load
  }, [checkAuth]);

  if(isCheckingAuth) return <LoadingSpinner />

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-800  to-emerald-900 overflow-hidden">
        <FloatingShapes
          color="bg-green-500"
          size="w-64 h-64"
          top="-5%"
          left="10%"
          delay={0}
        />
        <FloatingShapes
          color="bg-emerald-500"
          size="w-24 h-24"
          top="40%"
          left="10%"
          delay={0}
        />
        <FloatingShapes
          color="bg-emerald-300"
          size="w-32 h-32"
          top="60%"
          left="50%"
          delay={0}
        />
{/* Definig Routes */}
        <Routes>
          <Route path="/" element={<ProtectedRoute><DashBoard /></ProtectedRoute>} />
          <Route path="/login" element={<RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser>} />
          <Route path="/signup" element={<RedirectAuthenticatedUser><Signup /></RedirectAuthenticatedUser>} />
          <Route path="/forgot-password" element={<RedirectAuthenticatedUser><ForgotPassword /></RedirectAuthenticatedUser>} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path ="/reset-password/:token" element={<RedirectAuthenticatedUser><ResetPassword /></RedirectAuthenticatedUser>}/>
          <Route path ="*" element={<h1>Page Not Found</h1>}/>

        </Routes>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
