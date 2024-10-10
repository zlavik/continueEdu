import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Edit2, Star, Eye, EyeOff } from 'lucide-react';
import Modal from '../components/Modal';
import Tooltip from '../components/Tooltip';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  length: string;
  price: number;
  featured: boolean;
  visible: boolean;
}

const VideoLibrary: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { category } = useParams<{ category: string }>();
  const [videos, setVideos] = useState<Video[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'date' | 'hot' | 'length'>('featured');

  useEffect(() => {
    // Simulating fetching videos from an API
    const fetchedVideos: Video[] = [
      { id: '1', title: "Understanding Anxiety", thumbnail: "https://example.com/anxiety.jpg", length: "45:00", price: 19.99, featured: true, visible: true },
      { id: '2', title: "Coping with Depression", thumbnail: "https://example.com/depression.jpg", length: "50:00", price: 24.99, featured: false, visible: true },
      { id: '3', title: "Stress Management Techniques", thumbnail: "https://example.com/stress.jpg", length: "30:00", price: 14.99, featured: false, visible: true },
    ];
    setVideos(fetchedVideos);
  }, [category]);

  const handleEditClick = (video: Video) => {
    setEditingVideo(video);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (editedVideo: Video) => {
    setVideos(videos.map(v => v.id === editedVideo.id ? editedVideo : v));
    setIsEditModalOpen(false);
    setEditingVideo(null);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (editingVideo) {
      setVideos(videos.filter(v => v.id !== editingVideo.id));
      setIsDeleteModalOpen(false);
      setIsEditModalOpen(false);
      setEditingVideo(null);
    }
  };

  const toggleFeatured = (videoId: string) => {
    setVideos(videos.map(v => v.id === videoId ? { ...v, featured: !v.featured } : v));
  };

  const toggleVisibility = (videoId: string) => {
    setVideos(videos.map(v => v.id === videoId ? { ...v, visible: !v.visible } : v));
  };

  const sortedVideos = [...videos].sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      case 'date':
        return 0; // Implement date sorting logic
      case 'hot':
        return 0; // Implement popularity sorting logic
      case 'length':
        return a.length.localeCompare(b.length);
      default:
        return 0;
    }
  });

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} min-h-screen`}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 capitalize">{category?.replace('-', ' ')} Video Library</h1>
        
        <div className="mb-4 flex justify-between items-center">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'featured' | 'date' | 'hot' | 'length')}
            className={`p-2 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
          >
            <option value="featured">Featured</option>
            <option value="date">Date Created</option>
            <option value="hot">What's Hot</option>
            <option value="length">Length</option>
          </select>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {sortedVideos.map(video => (
            <div key={video.id} className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden relative ${!video.visible ? 'opacity-50' : ''}`}>
              <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
                <p>Length: {video.length}</p>
                <p>Price: ${video.price.toFixed(2)}</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2">
                  {user ? 'Watch Now' : 'Buy'}
                </button>
              </div>
              <div className="absolute top-2 right-2 flex space-x-2">
                <Tooltip content={video.featured ? "Unfeature" : "Feature"}>
                  <button onClick={() => toggleFeatured(video.id)}>
                    <Star className={video.featured ? 'text-yellow-400 fill-current' : 'text-gray-400'} />
                  </button>
                </Tooltip>
                <Tooltip content={video.visible ? "Hide" : "Show"}>
                  <button onClick={() => toggleVisibility(video.id)}>
                    {video.visible ? <Eye /> : <EyeOff />}
                  </button>
                </Tooltip>
                <Tooltip content="Edit">
                  <button onClick={() => handleEditClick(video)}>
                    <Edit2 />
                  </button>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Video"
      >
        {editingVideo && (
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSaveEdit(editingVideo);
          }}>
            <div className="mb-4">
              <label className="block mb-2">Title</label>
              <input
                type="text"
                value={editingVideo.title}
                onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })}
                className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Length (e.g., 10:30)</label>
              <input
                type="text"
                value={editingVideo.length}
                onChange={(e) => setEditingVideo({ ...editingVideo, length: e.target.value })}
                className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Price</label>
              <input
                type="number"
                value={editingVideo.price}
                onChange={(e) => setEditingVideo({ ...editingVideo, price: parseFloat(e.target.value) })}
                className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleDeleteClick}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <div>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        )}
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete"
      >
        <p>Are you sure you want to delete this video? This action cannot be undone.</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default VideoLibrary;