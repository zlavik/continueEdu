import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Edit2, Star, Eye, EyeOff, Search, Plus } from 'lucide-react';
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
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'date' | 'hot' | 'length'>('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newVideo, setNewVideo] = useState<Video>({
    id: '',
    title: '',
    thumbnail: '',
    length: '',
    price: 0,
    featured: false,
    visible: true
  });



  useEffect(() => {
    // Simulating fetching videos from an API
    const fetchedVideos: Video[] = [
      { id: '1', title: "Understanding Anxiety", thumbnail: "https://convergencepolicy.org/wp-content/uploads/2022/12/Health-and-Wellbeing_teal-01.png", length: "45:00", price: 19.99, featured: true, visible: true },
      { id: '2', title: "Coping with Depression", thumbnail: "https://www.planstreetinc.com/wp-content/uploads/2021/07/what-is-mental-health.png", length: "50:00", price: 24.99, featured: false, visible: true },
      { id: '3', title: "Stress Management Techniques", thumbnail: "https://www.skippackpharmacy.com/wp-content/uploads/2023/04/mental-health-wellness-during-covid-19.jpg", length: "30:00", price: 14.99, featured: false, visible: true },
    ];
    setVideos(fetchedVideos);
    setFilteredVideos(fetchedVideos);
  }, [category]);

  useEffect(() => {
    const filtered = videos.filter(video => 
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVideos(filtered);
  }, [searchTerm, videos]);

  const handleEditClick = (video: Video) => {
    setEditingVideo(video);
    setIsEditModalOpen(true);
  };

  const handleAddVideoClick = () => {
    setIsAddModalOpen(true);
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

  const sortedVideos = [...filteredVideos].sort((a, b) => {
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
          <div className="flex items-center">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search videos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 pr-4 py-2 rounded-full ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
            <button
              onClick={handleAddVideoClick}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Add Video
            </button>
          </div>
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
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-48 object-contain bg-gray-100" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
                <p>Length: {video.length}</p>
                <p>Price: ${video.price.toFixed(2)}</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2">
                  {user ? 'Watch Now' : 'Buy'}
                </button>
              </div>
              <div className='absolute top-2 left-2 flex space-x-2'>
                <Tooltip content={video.featured ? "Unfeature" : "Feature"}>
                  <button onClick={() => toggleFeatured(video.id)}>
                    <Star className={video.featured ? 'text-yellow-400 fill-current' : 'text-gray-500'} />
                  </button>
                </Tooltip>
              
              </div>
              <div className="absolute top-2 right-2 flex space-x-2">
                <Tooltip content={video.visible ? "Hide" : "Show"}>
                  <button onClick={() => toggleVisibility(video.id)}>
                    {video.visible ? <Eye className="text-gray-500" /> : <EyeOff className="text-gray-500" />}
                  </button>
                </Tooltip>
                <Tooltip content="Edit">
                  <button onClick={() => handleEditClick(video)}>
                    <Edit2 className="text-gray-500" />
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
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Video"
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          const videoToAdd = {
            ...newVideo,
            id: Date.now().toString(), // Generate a unique ID
          };
          setVideos([...videos, videoToAdd]);
          setFilteredVideos([...filteredVideos, videoToAdd]);
          setIsAddModalOpen(false);
          setNewVideo({
            id: '',
            title: '',
            thumbnail: '',
            length: '',
            price: 0,
            featured: false,
            visible: true
          });
        }}>
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input
              type="text"
              value={newVideo.title}
              onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
              className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Thumbnail URL</label>
            <input
              type="url"
              value={newVideo.thumbnail}
              onChange={(e) => setNewVideo({...newVideo, thumbnail: e.target.value})}
              className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
              placeholder="https://example.com/thumbnail.jpg"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Thumbnail Preview</label>
            <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center">
              {newVideo.thumbnail ? (
                <img src={newVideo.thumbnail} alt="Thumbnail preview" className="max-w-full max-h-full object-contain" />
              ) : (
                <span className="text-gray-500">No thumbnail</span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Length (e.g., 10:30)</label>
            <input
              type="text"
              value={newVideo.length}
              onChange={(e) => setNewVideo({...newVideo, length: e.target.value})}
              className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Price</label>
            <input
              type="number"
              value={newVideo.price}
              onChange={(e) => setNewVideo({...newVideo, price: parseFloat(e.target.value)})}
              className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add Video
            </button>
          </div>
        </form>
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
