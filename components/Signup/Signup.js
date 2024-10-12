import React, { useState } from 'react';
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Signup.css'
const Signup = () => {
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [signupError, setSignupError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.name) {
      setSignupError('Please fill in all fields.');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Add user to the 'users' collection in Firestore
      const usersRef = collection(db, 'users');
      await addDoc(usersRef, {
        email: formData.email,
        name: formData.name,
      });

      navigate('/login'); // Redirect to login page after signup
    } catch (error) {
      handleSignupError(error);
    }
  };

  const handleSignupError = (error) => {
    if (error.code === 'auth/email-already-in-use') {
      setSignupError('Email is already in use.');
    } else if (error.code === 'auth/weak-password') {
      setSignupError('Password is too weak.');
    } else {
      setSignupError('An unexpected error occurred. Please try again later.');
    }
    console.error('Error during signup:', error);
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100 signup-color'>
      <div className='imageformcontainer  d-flex justify-content-center align-items-center vh-100'>
      <img className='signuplogo' src='./images/Logo.svg' alt='Logo'></img> 
      <div className='card p-4 shadow-sm' style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className='text-center mb-4'>Sign Up</h2>
        <form className='signupform' onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>Name:</label>
            <input
              type='text'
              id='name'
              className='form-control'
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
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
          {signupError && <p className='text-danger text-center'>{signupError}</p>}
          <button type='submit' className='btn btn-primary w-100'>Sign Up</button>
        </form>
        <p className='text-center mt-3'>Already have an account? <Link to='/login'>Login</Link></p>
      </div>
    </div> 
    </div>
  );
};

export default Signup;
