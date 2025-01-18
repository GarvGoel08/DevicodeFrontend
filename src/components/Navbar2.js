import React from "react";

const Navbar = () => { 
  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <nav className="flex relative z-10 w-full py-2 px-6 bg-gradient-to-r from-blue-950 to-gray-950 shadow-md">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-xl font-bold">
            <img
                src="./Images/Devicode-Logo.png"
                className="h-[40px] "
                alt="Devicode Logo"
            />
        </div>

        {/* Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <button
              className="text-text-normal hover:text-gray-300"
              onClick={() => scrollToSection("home")}
          >
              Home
          </button>
        
          <button
            className="text-text-light hover:text-gray-300"
            onClick={() => scrollToSection("features")}
          >
            Features
          </button>
          <button
            className="text-text-light hover:text-gray-300"
            onClick={() => scrollToSection("learn-more")}
          >
            Learn More
          </button>
        </div>
        <div className="hidden md:flex space-x-6 items-center"> 
          <button className="border lg:text-base text-sm hover:bg-theme-color-primary transition-all duration-300 ease-in-out border-theme-color-primary text-text-normal py-2 px-4 w-max rounded-md">
            Sign Up
          </button>
          <button className="hover:bg-theme-color-primary lg:text-base text-sm transition-all duration-300 ease-in-out bg-theme-color-secondary text-text-normal py-[8px] px-6 w-max rounded-md"
          >
            Login
          </button>
        </div>


        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button className="text-white hover:text-gray-300">
            {/* Hamburger Icon */}
            &#9776;
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
