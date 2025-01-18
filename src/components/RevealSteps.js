import React,{useEffect,useRef} from 'react'
import { motion, useAnimation, useInView  } from 'framer-motion'

function RevealSteps({step,index}) {
  const ref = useRef(null);
  const currentView = useInView(ref,{once:true});
  const animatePart = useAnimation();
  const slidePart = useAnimation();

  useEffect(()=>{
    if(currentView){
      animatePart.start("visible")
      slidePart.start("visible")
    }
  },[currentView, animatePart, slidePart])

  return (
    <div ref={ref} style={{position: "relative",overflow: "hidden"}}>
    <motion.div
    
    variants={{
        hidden: {opacity:0, y:100},
        visible: {opacity: 1,y:0}
    }}
    initial="hidden"
    animate={animatePart}
    transition={{duration:1.2,delay:0.2}}

    className="flex flex-row">
    <div
      className="py-6 px-6 w-[50%] items-center justify-center max-lg:hidden sm:block hidden"
    >
      <div
        className={`flex flex-col w-full h-full gap-1 bg-white bg-opacity-5 rounded-xl p-4 py-6 ${
          index % 2 === 0 ? "" : "hidden"
        }`}
      >
        <h2 className="text-lg font-semibold text-text-normal">
          {step.title}
        </h2>
        <p className="text-base text-text-light">
          {step.description}
        </p>
      </div>
    </div>

    <div
      className="relative border-l sm:ml-0 ml-4 border-theme-color-primary py-6 px-6 sm:w-[50%] w-full items-center justify-center"
    >
      <div
        className={`flex flex-col w-full h-full gap-1 bg-white bg-opacity-5 rounded-xl p-4 py-6 ${
          index % 2 === 0 ? "sm:hidden block" : ""
        } `}
      >
        <h2 className="text-lg font-semibold text-text-normal">
          {step.title}
        </h2>
        <p className="text-base text-text-light">
          {step.description}
        </p>
      </div>
      <div className="absolute -left-[6px] top-[56px] transform -translate-y-1/2 w-3 h-3 bg-theme-color-primary rounded-full"></div>
    </div>
  </motion.div>
  <motion.div
  variants={{
    hidden: {left: 0},
    visible: {left: "100%"}
  }}
    initial="hidden"
    animate={slidePart}
    transition={{duration:0.6, ease:"easeIn"}}
    style={{position:"absolute",top:4,bottom:4,right:0,left:0,zIndex:100}}
    className='bg-theme-color-primary'
  />      
  </div>
  )
}

export default RevealSteps
