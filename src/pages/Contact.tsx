import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Contact: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} min-h-screen`}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Send Message
              </button>
            </form>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="mb-4">We're here to help and answer any question you might have. We look forward to hearing from you!</p>
            <div className="space-y-2">
              <p><strong>Address:</strong> 123 Health Education St, City, State 12345</p>
              <p><strong>Phone:</strong> (123) 456-7890</p>
              <p><strong>Email:</strong> info@transformativehealtheducation.com</p>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">Office Hours</h3>
              <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p>Saturday - Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;