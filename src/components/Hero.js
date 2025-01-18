import React, { useRef, useEffect } from "react";
import Typed from "typed.js";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const ref = useRef(null);
  const router = useNavigate();

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  useEffect(() => {
    const typed = new Typed(ref.current, {
      strings: [
        "Welcome to Devicode",
        "Empowering Developers Everywhere",
        "Simplify Backend Development",
        "Accelerate Your Projects",
      ],
      typeSpeed: 50,
      backDelay: 20,
      backSpeed: 50,
      loop: true,
    });

    return () => {
      // destroy typing animation in cleanup
      typed.destroy();
    };
  }, []);

  return (
    <div id="home">
      <img
        className="absolute top-0 right-0 h-full py-14 px-6 opacity-30 max-lg:hidden"
        src="./Images/API-HomeImg.png"
        alt=""
      />
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1, delay: 0.25 }}
        className="xl:w-[70%]"
      >
        <div className="flex flex-col sm:px-16 px-8 gap-6 lg:gap-8 justify-center min-h-[100vh] z-10 relative">
          <div className="w-full flex items-center justify-center mb-4">
            <img
              className=" w-[95%] xs:w-[88%]  sm:w-[74%] lg:hidden"
              src="./Images/API-HomeImg.png"
              alt="Devicode Logo"
            />
          </div>
          <h1 className="lg:text-5xl text-2xl font-bold text-text-normal leading-[2.3rem] lg:leading-[4rem]">
            The #1 Site for No Code Backend Solutions,{" "}
            <p className="inline text-theme-color-primary">Devicode</p>
            <br />
            <p className="inline text-theme-color-primary" ref={ref}></p>
          </h1>
          <p className="lg:text-2xl text-base font-semibold text-text-light">
            Creating Backend has never been easier. Get started with the{" "}
            <span className="text-theme-color-primary">Devicode API</span>, Get
            your API ready just by telling us about your routes and attributes
          </p>
          <div className="flex gap-4 flex-col sm:flex-row">
            <button onClick={() => router("/signup")} className="border max-sm:w-full hover:bg-theme-color-primary transition-all  duration-300 ease-in-out border-theme-color-primary text-text-normal py-2 px-6 w-max rounded-md">
              Get Started
            </button>
            <button onClick={() => scrollToSection("learn-more")} className="bg-theme-color-secondary max-sm:w-full hover:bg-theme-color-primary transition-all  duration-300 ease-in-out text-text-normal py-2 px-6 w-max rounded-md">
              Learn More
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
