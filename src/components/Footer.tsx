import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const { theme } = useTheme();

  return (
    <footer className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'} py-8`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0">
          <div className="w-full md:w-1/4">
            <h3 className="text-xl font-bold mb-4">Join our mailing list</h3>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Email"
                className={`p-2 rounded-md ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} text-sm mr-[10%]`}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-sm mr-[10%]"
              >
                Subscribe Now
              </button>
            </form>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/upcoming-events" className="hover:underline">Upcoming Events</a></li>
              <li><a href="/video-library/mental-health" className="hover:underline">Video Library</a></li>
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500"><Facebook size={24} /></a>
              <a href="#" className="hover:text-blue-400"><Twitter size={24} /></a>
              <a href="#" className="hover:text-pink-500"><Instagram size={24} /></a>
              <a href="#" className="hover:text-red-500"><Youtube size={24} /></a>
            </div>
          </div>
          <div className="w-full md:w-1/4">
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p>123 Health Education St</p>
            <p>City, State 12345</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: info@transformativehealtheducation.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-700 text-center">
          <p>&copy; 2024 Transformative Health Education. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;