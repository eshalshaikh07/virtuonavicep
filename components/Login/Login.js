import React, { useState, useEffect, useCallback } from 'react';
import { db, auth, provider } from '../../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Login.css'
const Login = ({ setUserDetails, setUserDocId }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [greeting, setGreeting] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const fetchUserData = useCallback(async (email) => {
    try {
      const adminRef = collection(db, 'admin');
      const usersRef = collection(db, 'users');

      const adminQuery = query(adminRef, where('email', '==', email));
      const usersQuery = query(usersRef, where('email', '==', email));

      const [adminSnapshot, userSnapshot] = await Promise.all([getDocs(adminQuery), getDocs(usersQuery)]);

      if (!adminSnapshot.empty) {
        const adminData = adminSnapshot.docs[0].data();
        setUserDetails(adminData);
        setUserDocId(adminSnapshot.docs[0].id);
        setGreeting('Hey Admin!');
        setIsLoggedIn(true);
        navigate('/admin');
      } else if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();
        setUserDetails(userData);
        setUserDocId(userSnapshot.docs[0].id);
        setGreeting('Hey User!');
        setIsLoggedIn(true);
        navigate('/home');
      } else {
        setLoginError('No account found for this email.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [setUserDetails, setUserDocId, navigate]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData(user.email);
      }
    });
    return () => unsubscribe();
  }, [fetchUserData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setLoginError('Please provide both email and password.');
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      fetchUserData(user.email);
    } catch (error) {
      handleLoginError(error);
    }
  };

  const handleLoginError = (error) => {
    if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
      setLoginError('Invalid email or password.');
    } else if (error.code === 'auth/user-not-found') {
      setLoginError('User not found.');
    } else {
      setLoginError('An unexpected error occurred. Please try again later.');
    }
    console.error('Error during login:', error);
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      fetchUserData(user.email);
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      handleLoginError(error);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 logincolor'>
      {!isLoggedIn ? (   
        <div className='imageformcontainer    d-flex justify-content-center align-items-center vh-100'>
          <img className='loginlogo' src='./images/Logo.svg' alt='Logo'></img> 
        <div className='card p-4 shadow-sm' style={{ width: '100%', maxWidth: '400px' }}>
          <h2 className='text-center mb-4'>Login</h2>
          <form className='loginform' onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>Email:</label>
              <input
                type='email'
                id='email'
                className='form-control'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>Password:</label>
              <input
                type='password'
                id='password'
                className='form-control'
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <button type='submit' className='btn btn-primary w-100 mb-2'>Login</button>
            {loginError && <p className='text-danger text-center'>{loginError}</p>}
          </form>
          <button onClick={signInWithGoogle} className='btn btn-secondary w-100'>Sign in with Google</button>
          <p className='text-center mt-3'>Don't have an account? <Link to='/Signup'>Sign up</Link></p>
        </div>
        </div>
      ) : (
        <div className='text-center'>
          <h1>{greeting}</h1>
          <p>Redirecting you to your dashboard...</p>
        </div>
      )}
    </div>
    
  );
};

export default Login;
