import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface AdminToolbarProps {
  onAddVideo: () => void;
  onAddWebinar: () => void;
}

const AdminToolbar: React.FC<AdminToolbarProps> = ({ onAddVideo, onAddWebinar }) => {
  const { theme } = useTheme();

  return (
    <div className={`fixed bottom-4 right-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-4 rounded-lg shadow-lg`}>
      <button
        onClick={onAddVideo}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
      >
        Add Video
      </button>
      <button
        onClick={onAddWebinar}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Webinar
      </button>
    </div>
  );
};

export default AdminToolbar;