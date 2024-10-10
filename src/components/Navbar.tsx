import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Search, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const NavLinks = () => (
    <>
      <Link to="/" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">Home</Link>
      <Link to="/upcoming-events" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">Upcoming Events</Link>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="block w-full text-left py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Video Library
        </button>
        {isDropdownOpen && (
          <div className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
            <Link to="/video-library/mental-health" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Mental Health</Link>
            <Link to="/video-library/eating-disorders" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Eating Disorders</Link>
            <Link to="/video-library/transgender-health" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Transgender Health</Link>
            <Link to="/video-library/other" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600">Other</Link>
          </div>
        )}
      </div>
      <Link to="/contact" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">Contact Us</Link>
      {user ? (
        <Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">Dashboard</Link>
      ) : (
        <Link to="/login" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700">Login</Link>
      )}
    </>
  );

  return (
    <nav className={`sticky top-0 z-10 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img src="https://i.postimg.cc/SJZpnPSz/logo.png" alt="Transformative Health Education Logo" className="h-10 w-auto mr-2" />
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <NavLinks />
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search..."
                className={`pl-8 pr-2 py-1 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4" />
            </div>
            <button onClick={toggleTheme} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <NavLinks />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;