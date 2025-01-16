import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../assets/logo.png';

const Header = () => {
  return (
    <header className="px-4 pt-4">
      <div className="flex items-center p-4 justify-center bg-gray-300 dark:bg-gray-700 rounded-lg">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Grantscraper Logo" className="h-10" />
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200 ml-4">
            Grantscraper
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
