import React from 'react';

const Footer = () => {
  return (
    <footer className="px-4 pb-4">
      <div className="bg-gray-300 text-sm dark:bg-gray-700 rounded-lg p-4 w-full">
        <nav className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-24 mb-4">
          <a href="/terms-of-use" className="font-semibold text-gray-600 hover:text-white">
            Terms of Use
          </a>
          <a href="/privacy-policy" className="font-semibold text-gray-600 hover:text-white">
            Privacy Policy
          </a>
          <a href="/about" className="font-semibold text-gray-600 hover:text-white">
            About
          </a>
          <a href="/disclaimer" className="font-semibold text-gray-600 hover:text-white">
            Disclaimer
          </a>
        </nav>
        <div className="text-sm italic text-gray-600 text-center">
          <p>
            Designed and Developed by{' '}
            <a 
              href="https://www.linkedin.com/in/aljonlayson/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-semibold hover:text-white"
            >
              Aljon Layson
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
