import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../assets/logo.png';
import SearchBar from './searchbar';

const Header = () => {
  return (
    <header className="px-4 pt-4 relative z-10">
      <div className="flex flex-col p-4 justify-between bg-gray-300 dark:bg-gray-700 rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center w-full gap-4">
          
          <div className="w-full md:w-auto flex justify-center">
            <Link to="/" className="flex items-center justify-center">
              <img src={logo} alt="GrantScraper Logo" className="h-20 w-72 md:p-2" />
            </Link>
          </div>

          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
