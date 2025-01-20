import React, { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import VerificationInput from "react-verification-input";
import { userAuthStore } from "../store/authStore.js";

const VerifyEmail = () => {
  const { verifyEmail, error } = userAuthStore();

 const navigate = useNavigate();

  const [code, setCode] = useState("");
  const isCodeComplete = code.length === 6;

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await verifyEmail(code);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  // let value;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 20 }}
      transition={{ duration: 0.5 }}
      className="max-w-md  bg-gray-800 bg-opacity-50 backdrop-filter bacdrop-blur-xl shadow-xl overflow-hidden rounded-md py-4 "
    >
      <div className=" flex flex-col justify-center items-center gap-6 px-6 py-6 rounded-t-md mx-4">
        <h1 className="text-2xl text-green-400  font-bold">
          Verify Your Email
        </h1>
        <h3 className="text-sm text-gray-300">
          Enter 6-digit Code Sent To Your Email Address
        </h3>
        <VerificationInput
          value={code}
          validChars="0-9"
          onChange={(value) => setCode(value)}
          classNames={{
            container: "container",
            character: "character",
            characterInactive: "character--inactive",
            characterSelected: "character--selected",
            characterFilled: "character--filled",
          }}
        />

        {error && (
          <p className="text-red-500 font-semibold mt-2 flex justify-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <button
            type="submit"
            disabled={!isCodeComplete} // Button disabled until full code is entered
            className={`px-4 py-2 rounded-md text-white ${
              isCodeComplete
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-500 cursor-not-allowed "
            }`}
          >
            Verify Email
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default VerifyEmail;
