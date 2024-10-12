import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebaseConfig'; // Import Firebase auth

const Home = ({ userDetails, userDocId }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      <h1>Hey {userDetails?.name || 'User'}</h1>
      <p>Welcome to the user dashboard.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
