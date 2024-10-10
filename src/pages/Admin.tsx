import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

interface Video {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  price: number;
}

const Admin: React.FC = () => {
  const { theme } = useTheme();
  const [events, setEvents] = useState<Event[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [newEvent, setNewEvent] = useState<Event>({ id: '', title: '', date: '', time: '', location: '', description: '' });
  const [newVideo, setNewVideo] = useState<Video>({ id: '', title: '', category: '', thumbnail: '', price: 0 });

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    setEvents([...events, { ...newEvent, id: Date.now().toString() }]);
    setNewEvent({ id: '', title: '', date: '', time: '', location: '', description: '' });
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    setVideos([...videos, { ...newVideo, id: Date.now().toString() }]);
    setNewVideo({ id: '', title: '', category: '', thumbnail: '', price: 0 });
  };

  const handleRemoveEvent = (id: string) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleRemoveVideo = (id: string) => {
    setVideos(videos.filter(video => video.id !== id));
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} min-h-screen p-8`}>
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Manage Events</h2>
          <form onSubmit={handleAddEvent} className="mb-4 space-y-2">
            <input
              type="text"
              placeholder="Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
              required
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
              required
            />
            <input
              type="time"
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
              className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
              required
            />
            <input
              type="text"
              placeholder="Location"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
              required
            />
            <textarea
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
              required
            ></textarea>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Event</button>
          </form>
          <ul className="space-y-2">
            {events.map(event => (
              <li key={event.id} className="flex justify-between items-center">
                <span>{event.title}</span>
                <button onClick={() => handleRemoveEvent(event.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Remove</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Manage Videos</h2>
          <form onSubmit={handleAddVideo} className="mb-4 space-y-2">
            <input
              type="text"
              placeholder="Title"
              value={newVideo.title}
              onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
              className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
              required
            />
            <select
              value={newVideo.category}
              onChange={(e) => setNewVideo({ ...newVideo, category: e.target.value })}
              className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
              required
            >
              <option value="">Select Category</option>
              <option value="mental-health">Mental Health</option>
              <option value="eating-disorders">Eating Disorders</option>
              <option value="transgender-health">Transgender Health</option>
              <option value="other">Other</option>
            </select>
            <input
              type="text"
              placeholder="Thumbnail URL"
              value={newVideo.thumbnail}
              onChange={(e) => setNewVideo({ ...newVideo, thumbnail: e.target.value })}
              className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={newVideo.price}
              onChange={(e) => setNewVideo({ ...newVideo, price: parseFloat(e.target.value) })}
              className={`w-full p-2 rounded ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
              required
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Add Video</button>
          </form>
          <ul className="space-y-2">
            {videos.map(video => (
              <li key={video.id} className="flex justify-between items-center">
                <span>{video.title}</span>
                <button onClick={() => handleRemoveVideo(video.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Admin;