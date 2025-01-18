import React, {useEffect,useRef} from 'react'
import { motion,useInView, useAnimation } from "framer-motion";

function RevealFeature({feature}) {
  const ref = useRef(null);
  const currentView = useInView(ref,{once:true});
  const animatePart = useAnimation();

  useEffect(()=>{
    if(currentView){
      animatePart.start("visible")
    }
  },[currentView])

  return (
        <motion.div ref={ref}
        variants={{
            hidden: {opacity:0, y:100},
            visible: {opacity: 1,y:0}
        }}
        initial="hidden"
        animate={animatePart}
        transition={{duration:1.2,delay:0.2}}
        
        className={`flex text-center items-center justify-center flex-1 gap-4 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950
 shadow-card-shadow backdrop-blur-lg border border-text-light rounded-lg duration-150 bg-black bg-opacity-[0.15] cursor-default hover:border-theme-color-secondary p-6 py-8 flex-col`}
        >
        <div className="text-icon ">
          <img src={feature.icon}/>
        </div>
        <div className="flex flex-col gap-2">
            <h2 className="text-primary text-xl font-semibold leading-snug">
            {feature.title}
            </h2>
            <p className="text-secondary-light text-text-light text-base font-normal leading-relaxed">
            {feature.description}
            </p>
        </div>
        </motion.div>
    
  )
}

export default RevealFeature

