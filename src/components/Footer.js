import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-main-bg text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* About Section */}
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h3 className="text-lg font-bold text-white mb-4">About Devicode</h3>
            <p className="text-sm">
              Devicode simplifies backend development with no-code solutions. Create, manage, and scale APIs seamlessly.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="w-full sm:w-1/4 mb-6 sm:mb-0">
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-light-blue">Home</a></li>
              <li><a href="#" className="hover:text-light-blue">API</a></li>
              <li><a href="#" className="hover:text-light-blue">Pricing</a></li>
              <li><a href="#" className="hover:text-light-blue">Contact</a></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="w-full sm:w-1/4">
            <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-light-blue transition duration-300"
              >
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-light-blue transition duration-300"
              >
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a
                href="https://github.com/farhan0304"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-light-blue transition duration-300"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-light-blue transition duration-300"
              >
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-8">
          © 2025 Devicode. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
