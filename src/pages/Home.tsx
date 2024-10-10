import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Home: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <header className="py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Transformative Health Education</h1>
        <p className="text-xl">Empowering individuals through knowledge and support</p>
      </header>
      
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
        <p className="text-lg mb-6">
          At Transformative Health Education, we are dedicated to providing comprehensive, accessible, and empowering health education. Our goal is to transform lives through knowledge, support, and community engagement.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <h3 className="text-xl font-semibold mb-4">Mental Health</h3>
            <p>Explore resources and support for mental well-being and personal growth.</p>
          </div>
          <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <h3 className="text-xl font-semibold mb-4">Eating Disorders</h3>
            <p>Find information and guidance on understanding and overcoming eating disorders.</p>
          </div>
          <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
            <h3 className="text-xl font-semibold mb-4">Transgender Health</h3>
            <p>Access resources and support for transgender individuals and their health needs.</p>
          </div>
        </div>
      </section>
      
      <section className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} py-12`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-6">Featured Content</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Health Education Seminar" className="rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">Upcoming Webinar: Understanding Anxiety</h3>
              <p>Join our expert panel for an in-depth discussion on managing anxiety in daily life.</p>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Support Group Meeting" className="rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">New Support Group: Eating Disorder Recovery</h3>
              <p>Connect with others on the journey to recovery in our supportive and understanding community.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;