import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { theme } = useTheme();
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      // Handle successful login/signup (e.g., redirect to dashboard)
    } catch (error) {
      console.error('Authentication error:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} min-h-screen flex items-center justify-center`}>
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-8 rounded-lg shadow-md w-full max-w-md`}>
        <h1 className="text-3xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block mb-1">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:underline"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Log in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;