import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const UpcomingEvents: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();

  const events = [
    {
      id: 1,
      title: "Mental Health Awareness Workshop",
      date: "2024-04-15",
      time: "14:00 - 16:00",
      location: "Online Webinar",
      description: "Join us for an interactive workshop on understanding and managing mental health in daily life."
    },
    {
      id: 2,
      title: "Eating Disorders: Path to Recovery",
      date: "2024-04-22",
      time: "18:30 - 20:00",
      location: "Community Center, 123 Main St",
      description: "A supportive seminar for those affected by eating disorders and their loved ones."
    },
    {
      id: 3,
      title: "Transgender Health and Wellness Symposium",
      date: "2024-05-01",
      time: "09:00 - 17:00",
      location: "City Convention Center",
      description: "A full-day event dedicated to transgender health issues, featuring expert speakers and community resources."
    }
  ];

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} min-h-screen`}>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">Upcoming Events</h1>
        <div className="grid gap-8">
          {events.map(event => (
            <div key={event.id} className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6`}>
              <h2 className="text-2xl font-semibold mb-2">{event.title}</h2>
              <p className="text-lg mb-2"><strong>Date:</strong> {event.date}</p>
              <p className="text-lg mb-2"><strong>Time:</strong> {event.time}</p>
              <p className="text-lg mb-2"><strong>Location:</strong> {event.location}</p>
              <p className="text-lg mb-4">{event.description}</p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Register Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;