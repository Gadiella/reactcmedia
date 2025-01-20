import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logomenu.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img src={logo} alt="CmediaEVENTS" className="h-12" />
            </Link>
          </div>
          <div className="flex items-center space-x-6 hidden md:flex">
            <Link to="/" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-semibold">
              Accueil
            </Link>
            <a href="https://cmediaevents.net/" target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-semibold">
              Evenements
            </a>
            <Link to="/voter" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-semibold">
              Voter
            </Link>
          </div>
          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center text-gray-700 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div
          className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-2 space-y-4`}
        >
          <Link to="/" className="block px-4 py-2 text-gray-700 hover:text-gray-900 font-semibold">
            Accueil
          </Link>
          <a href="https://cmediaevents.net/" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-gray-700 hover:text-gray-900 font-semibold">
            Evenements
          </a>
          <Link to="/voter" className="block px-4 py-2 text-gray-700 hover:text-gray-900 font-semibold">
            Voter
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
