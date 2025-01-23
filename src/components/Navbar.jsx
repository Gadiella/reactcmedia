import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import logo from '../assets/logomenu.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img src={logo} alt="CmediaEVENTS" className="h-12" />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-semibold">
              Accueil
            </Link>
            <a
              href="https://cmediaevents.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-semibold"
            >
              Evenements
            </a>
            <Link to="/voter" className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-semibold">
              Voter
            </Link>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </button>

            {user?.role === 'admin' && (
              <div className="flex items-center space-x-3">
                
                <button
                  onClick={logout}
                   className="px-4 py-2 bg-black text-white rounded-md hover:bg-red-600 transition-colors duration-200"
                >
                  Déconnexion
                </button>
              </div>
            )}

            {!user && (
              <Link
                to="/login"
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-red-600 transition-colors duration-200"
              >
                Connexion
              </Link>
            )}
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none"
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

        {/* Mobile menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} mt-2 space-y-4 pb-4`}>
          <Link to="/" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-semibold">
            Accueil
          </Link>
          <a
            href="https://cmediaevents.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-semibold"
          >
            Evenements
          </a>
          <Link to="/voter" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-semibold">
            Voter
          </Link>

          <button
            onClick={toggleDarkMode}
            className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white font-semibold"
          >
            {darkMode ? 'Mode Clair' : 'Mode Sombre'}
          </button>

          {!user && (
            <Link
              to="/login"
              className="block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Connexion
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
