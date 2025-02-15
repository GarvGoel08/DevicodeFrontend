import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import DevicodeLogo from "../pages/Images/Devicode-Logo.png";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => (state.user && state.user.expiresIn > new Date().getTime()));
  const [showNavbar, setShowNavbar] = useState(false);
  const router = useNavigate();
  const isHome = window.location.pathname === "/";
  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn && !isHome) {
      router("/");
    }
  }, [isLoggedIn, router, isHome]);

  const handleLogout = () => {
    dispatch(logout());
    fetch(`${process.env.REACT_APP_BACKEND_URL}api/v1/logout`, {
      method: "POST",
      credentials: "include",
    });
    fetch(`${process.env.REACT_APP_AIGENERATEDSCHEMA_URL}api/v1/user/logout`,{
      method: "GET",
      credentials: "include",
    })
    router("/");
  };

  const handleNavClick = () => {
    setShowNavbar(prev => !prev);
    
  }

  return (
    <nav className="flex relative z-10 w-full py-2 px-6 bg-gradient-to-r from-blue-950 to-gray-950 shadow-md">
      <div className="w-full mx-auto px-4 py-2 flex flex-wrap items-center justify-between">
        <div className="text-white text-xl font-bold">
          <img
            src={DevicodeLogo}
            className="h-[40px] "
            alt="Devicode Logo"
          />
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden ">
          <button className="text-white hover:text-text-normal"
          onClick={handleNavClick}
          >
            {/* Hamburger Icon */}
            
            {showNavbar?`\u2716`:`\u2630`}
          </button>
          
        </div>

        {isHome && (
          <div className={`flex md:space-x-6 max-md:gap-4 max-md:flex-col max-md:w-full items-center ${showNavbar?``:`max-md:hidden`}`}>
            <button
              className="text-text-normal"
              onClick={() => scrollToSection("home")}
            >
              Home
            </button>
            <button
              className="text-text-light hover:text-text-normal"
              onClick={() => scrollToSection("learn-more")}
            >
              How It Works
            </button>

            <button
              className="text-text-light hover:text-text-normal"
              onClick={() => scrollToSection("features")}
            >
              Features
            </button>
          </div>
        )}
        <div className={`flex max-md:mt-4 md:space-x-6 max-md:flex-col max-md:gap-4 max-md:w-full items-center ${showNavbar?``:`max-md:hidden`}`}>
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => router("/signup")}
                className="border lg:text-base text-sm hover:bg-theme-color-primary transition-all duration-300 ease-in-out border-theme-color-primary text-text-normal py-2 px-4 w-max rounded-md"
              >
                Sign Up
              </button>
              <button
                onClick={() => router("/login")}
                className="hover:bg-theme-color-primary lg:text-base text-sm transition-all duration-300 ease-in-out bg-theme-color-secondary text-text-normal py-[8px] px-6 w-max rounded-md"
              >
                Login
              </button>
            </>
          ) : (
            <>
              {isHome ? (
                <button
                  onClick={() => router("/dashboard")}
                  className="text-text-light flex justify-center items-center hover:text-theme-color-primary text-icon"
                >
                  <span className="material-symbols-outlined">dashboard</span>
                </button>
              ) : (
                <button
                  onClick={() => handleLogout()}
                  className="text-text-light flex justify-center items-center hover:text-theme-color-primary text-icon"
                >
                  <span className="material-symbols-outlined">logout</span>
                </button>
              )}
            </>
          )}
        </div>

        
      </div>
    </nav>
  );
};

export default Navbar;
