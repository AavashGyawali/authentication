import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link ,useNavigate} from "react-router-dom";
import { motion } from "framer-motion";
import {userAuthStore} from "../store/authStore.js"


const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const {login,error} =userAuthStore()

  const navigate = useNavigate()

  const handleSignUp = async (event) => {
    event.preventDefault();
    try{
      await login(email,password)
      // navigate("/logged-in")
    }catch(error){
      console.log(error)
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 20 }}
      transition={{ duration: 0.5 }}
      className="max-w-md   bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800 rounded-t-md pt-4"
    >
      <div className=" flex flex-col justify-center items-center gap-6 px-6 py-6 rounded-t-md mx-4">
        <h1 className="text-2xl text-green-400  font-bold">Log In</h1>

        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
         
          <Input
            type="email"
            placeholder="Email"
            iconName="FaEnvelope"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            iconName="FaLock"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/forgot-password"><div className="text-xs text-green-500 hover:cursor-pointer">forgot password</div></Link>
          {error && (
          <p className="text-red-500 font-semibold mt-2 flex justify-center">
            {error}
          </p>
        )}
          <Button text="Log In" buttonColor="green-500" textColor="white" 
           />
        </form>
      </div>
      <div className="text-xs flex items-center justify-center gap-1 bg-[#102225] rounded-b-md py-3 ">
        <span className="text-white">Don't have an account?</span>
        <Link to="/signup">
          <span className="text-green-500 cursor-pointer hover:text-green-400 active:text-green-500">
            Sign Up
          </span>
        </Link>
      </div>
    </motion.div>
  );
};

export default Signup;
