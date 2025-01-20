import React from 'react'
import {motion} from "framer-motion"
import * as Icons from "react-icons/fa";

const Input = ({iconName,...props}) => {

    const IconComponent= Icons[iconName] || Icons.FaSearch;
  return (
    <div className='relative '>
    <motion.input  
    className='w-full bg-[#1D3135] px-10 py-2 rounded-md  text-[16px] border border-solid border-emerald-700 placeholder-gray-100 text-green-400 focus:outline-none  focus:border-green-400'
    {...props}
    />
     <motion.div
        style={{
          position: "absolute",
          left: "15px", // Icon on the right inside the input
          top: "45%",
          transform: "translateY(-50%)",
          pointerEvents: "none", // Make sure the icon doesn't block input clicks
        }}
       
      >
        <IconComponent size={18} className='text-green-400' />
      </motion.div>
    </div>
  )
}

export default Input