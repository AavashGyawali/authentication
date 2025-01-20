import React from 'react'
import {motion} from "framer-motion"
import { Loader } from "lucide-react";
import {userAuthStore} from "../store/authStore.js"

const Button = ({text,...props}) => {

   const {isLoading}=userAuthStore()
  
  return (
    <>
        <motion.button 
        className={`text-${props.textColor}  bg-${props.buttonColor} px-4 py-1 rounded-md w-full font-semibold bg-green-600 hover:bg-green-700 active:bg-green-600 flex justify-center items-center`}
        whileHover={{scale:1.02}}
        whileTap={{scale:0.98}}
        type='submit'
        disabled={isLoading}
        
        >{isLoading?<Loader className='animate-spin' />:text}</motion.button>
    </>
  )
}

export default Button