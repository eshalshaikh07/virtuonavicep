import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebaseConfig'; // Ensure firebaseConfig is set up correctly
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Admin from './components/Admin/Admin';
import FrontPage from './components/FrontPage/FrontPage';
import References from './components/References/References';
import Floor5 from './components/Building6/Floor5/Floor5';
import User from './components/User/User';

function App() {
  const [userDetails, setUserDetails] = useState(null);
  const [userDocId, setUserDocId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserDetails({ name: user.displayName, email: user.email });
        setUserDocId(user.uid); // Fetch user's Firestore doc ID if needed
      } else {
        setIsAuthenticated(false);
        setUserDetails(null);
        setUserDocId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/login" element={!isAuthenticated ? <Login setUserDetails={setUserDetails} setUserDocId={setUserDocId} /> : <Navigate to="/user" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={isAuthenticated ? <User userDetails={userDetails} userDocId={userDocId} /> : <Navigate to="/login" />} />
        <Route path="/admin" element={isAuthenticated ? <Admin userDetails={userDetails} userDocId={userDocId} /> : <Navigate to="/login" />} />
        <Route path="/References" element={<References />} />
        <Route path="/Floor5" element={<Floor5 />} />
      </Routes>
    </Router>
  );
}

export default App;
