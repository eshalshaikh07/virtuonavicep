import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebaseConfig'; // Ensure db is imported
import { collection, getDocs } from 'firebase/firestore'; // Import collection and getDocs
import './User.css'; // Import CSS file for styling

const User = ({ userDetails, userDocId }) => {
  const [teachers, setTeachers] = useState([]);

  const handleLogout = () => {
    auth.signOut().then(() => {
      console.log('User signed out');
    }).catch((error) => {
      console.error('Error logging out: ', error);
    });
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teachersCollection = collection(db, 'teachers'); // Get the collection reference
        const teachersSnapshot = await getDocs(teachersCollection); // Fetch the documents
        const teachersData = teachersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        if (teachersData.length === 0) {
          console.log('No teachers found.');
        } else {
          console.log('Fetched Teachers:', teachersData);
        }

        setTeachers(teachersData);
      } catch (error) {
        console.error('Error fetching teachers: ', error);
      }
    };
  
    fetchTeachers();
  }, []);
  
  if (!userDetails) {
    return (
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <h2>Loading User Data...</h2>
      </div>
    );
  }

  return (
    <div className="container vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1>Hello, {userDetails.name || 'User'}!</h1>
     
     

      <h2 className="mt-4">Teachers List</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Designation</th>
            <th>Classroom</th>
            <th>Days Available</th>
            <th>Floor</th>
            <th>Personal Website</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length > 0 ? (
            teachers.map(teacher => (
              <tr key={teacher.id}>
                <td>{teacher.name}</td>
                <td>{teacher.designation}</td>
                <td>{teacher.classroom}</td>
                <td>{teacher.daysAvailable}</td>
                <td>{teacher.floor}</td>
                <td>
                  <a href={teacher.personalWebsite} target="_blank" rel="noopener noreferrer">
                    Visit
                  </a>
                </td>
                <td>
                  <img src={teacher.imageLink} alt={teacher.name} style={{ width: '50px', height: '50px' }} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No teachers available</td>
            </tr>
          )}
        </tbody>
      </table>

      <button className="btn-logout mt-3" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default User;
