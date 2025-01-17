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
        
        className="flex text-center items-center justify-center flex-1 gap-4 bg-card-bg shadow-card-shadow backdrop-blur-lg border border-text-light rounded-lg duration-150 bg-black bg-opacity-[0.15] cursor-default hover:border-theme-color-secondary p-6 py-8 flex-col"
        >
        <div className="text-icon">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            fill="currentColor"
            viewBox="0 0 256 256"
            >
            <path d="M208,24H72A32,32,0,0,0,40,56V224a8,8,0,0,0,8,8H192a8,8,0,0,0,0-16H56a16,16,0,0,1,16-16H208a8,8,0,0,0,8-8V32A8,8,0,0,0,208,24Zm-8,160H72a31.82,31.82,0,0,0-16,4.29V56A16,16,0,0,1,72,40H200Z"></path>
            </svg>
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
