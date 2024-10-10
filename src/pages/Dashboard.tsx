import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // or a loading indicator if preferred
  }

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} min-h-screen`}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Welcome, {user.name}!</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <h2 className="text-2xl font-semibold mb-4">Your Courses</h2>
            <ul className="list-disc list-inside">
              <li>Understanding Anxiety</li>
              <li>Nutrition Basics</li>
              <li>Transgender Healthcare Basics</li>
            </ul>
          </div>
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-md`}>
            <h2 className="text-2xl font-semibold mb-4">Progress</h2>
            <div className="mb-4">
              <p>Understanding Anxiety</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '45%'}}></div>
              </div>
            </div>
            <div className="mb-4">
              <p>Nutrition Basics</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '70%'}}></div>
              </div>
            </div>
            <div>
              <p>Transgender Healthcare Basics</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '20%'}}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Recommended Courses</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-md`}>
              <h3 className="text-xl font-semibold mb-2">Stress Management Techniques</h3>
              <p>Learn effective ways to manage stress in your daily life.</p>
            </div>
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-md`}>
              <h3 className="text-xl font-semibold mb-2">Exercise and Mental Health</h3>
              <p>Discover the powerful connection between physical activity and mental well-being.</p>
            </div>
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-md`}>
              <h3 className="text-xl font-semibold mb-2">Hormone Therapy Information</h3>
              <p>Comprehensive guide to hormone therapy for transgender individuals.</p>
            </div>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};
export default Dashboard;