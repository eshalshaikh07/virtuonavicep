import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import React, { useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, doc, getDocs, query, where, updateDoc, addDoc, deleteDoc } from 'firebase/firestore'; // Firebase Firestore imports
import './Admin.css'; // Import CSS file for styling
import Modal from 'react-modal'; // Import modal from react-modal

// Set the app element for accessibility
Modal.setAppElement('#root');

function Admin() {
  const [teacherName, setTeacherName] = useState('');
  const [classroom, setClassroom] = useState('');
  const [designation, setDesignation] = useState('');
  const [daysAvailable, setDaysAvailable] = useState('');
  const [floor, setFloor] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [personalWebsite, setPersonalWebsite] = useState('');
  const [teacherList, setTeacherList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null); // State for selected floor
  const [modalIsOpen, setModalIsOpen] = useState(false); // State for modal

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Handle adding/updating teacher info
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        const teacherRef = doc(db, 'teachers', selectedTeacher.id);
        await updateDoc(teacherRef, {
          name: teacherName,
          classroom: classroom,
          designation: designation,
          daysAvailable: daysAvailable,
          floor: floor,
          imageLink: imageLink,
          personalWebsite: personalWebsite,
        });
        alert(`Teacher ${teacherName} updated successfully!`);
      } else {
        await addDoc(collection(db, 'teachers'), {
          name: teacherName,
          classroom: classroom,
          designation: designation,
          daysAvailable: daysAvailable,
          floor: floor,
          imageLink: imageLink,
          personalWebsite: personalWebsite,
        });
        alert(`Teacher ${teacherName} added successfully!`);
      }
      resetForm();
    } catch (error) {
      console.error('Error submitting document: ', error);
      alert('Error submitting teacher details. Please try again.');
    }
  };

  // Reset form fields
  const resetForm = () => {
    setTeacherName('');
    setClassroom('');
    setDesignation('');
    setDaysAvailable('');
    setFloor('');
    setImageLink('');
    setPersonalWebsite('');
    setEditMode(false);
    setSelectedTeacher(null);
  };

  // Fetch teacher data for clicked classroom
  const handleRoomClick = async (roomNumber) => {
    try {
      const q = query(collection(db, 'teachers'), where('classroom', '==', roomNumber));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const teacherData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTeacherList(teacherData);
        setModalIsOpen(true); // Open modal after fetching teacher data
      } else {
        alert(`No teacher details found for classroom ${roomNumber}.`);
        setTeacherList([]);
      }
    } catch (e) {
      console.error('Error fetching teacher details: ', e);
      alert('Error fetching details. Please try again.');
    }
  };

  // Function to handle floor button click
  const handleFloorClick = (floorNumber) => {
    setSelectedFloor(floorNumber);
    setTeacherList([]); // Clear the teacher list when changing floors
  };

  // Function to handle editing a teacher
  const handleEditTeacher = (teacher) => {
    setEditMode(true);
    setSelectedTeacher(teacher);
    setTeacherName(teacher.name);
    setClassroom(teacher.classroom);
    setDesignation(teacher.designation);
    setDaysAvailable(teacher.daysAvailable);
    setFloor(teacher.floor);
    setImageLink(teacher.imageLink);
    setPersonalWebsite(teacher.personalWebsite);
  };

  // Function to handle deleting a teacher
  const handleDeleteTeacher = async (teacherId) => {
    try {
      await deleteDoc(doc(db, 'teachers', teacherId));
      alert('Teacher deleted successfully!');
      setTeacherList((prevList) => prevList.filter((teacher) => teacher.id !== teacherId));
    } catch (error) {
      console.error('Error deleting teacher: ', error);
      alert('Error deleting teacher. Please try again.');
    }
  };

  // Function to close modal
  const closeModal = () => {
    setModalIsOpen(false);
    setTeacherList([]); // Clear the teacher list when closing the modal
  };

  return (
    <div className="Admin">
      <h1>{editMode ? 'Edit Teacher Information' : 'Add Teacher Information'}</h1>
      <form className="form" onSubmit={handleSubmit}>
        {/* Teacher Form Fields */}
        <div>
          <label>Teacher Name:</label>
          <input
            type="text"
            placeholder='Enter Name of Teacher'
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Classroom:</label>
          <input
            type="text"
            placeholder='Enter Classroom'
            value={classroom}
            onChange={(e) => setClassroom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Designation:</label>
          <input
            type="text"
            placeholder='Enter Teacher Designation'
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Days Available:</label>
          <input
            type="text"
            placeholder='Availability'
            value={daysAvailable}
            onChange={(e) => setDaysAvailable(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Floor:</label>
          <input
            type="number"
            placeholder='Enter Floor Location'
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            required
            min="1"
            max="5"
          />
        </div>
        <div>
          <label>Image Link:</label>
          <input
            type="text"
            placeholder='Enter Image URL'
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Personal Website:</label>
          <input
            type="text"
            placeholder='Enter Personal Website'
            value={personalWebsite}
            onChange={(e) => setPersonalWebsite(e.target.value)}
          />
        </div>
        <div className='btn'>
          <button type="submit">{editMode ? 'Update Teacher' : 'Add Teacher'}</button>
        </div>
        <button type="button" onClick={handleLogout}>Logout</button>
      </form>

      {/* Floors Button */}
      <div className="floor-buttons">
        <h2>Select Floor</h2>
        {[1, 2, 3, 4, 5].map((num) => (
          <button key={num} onClick={() => handleFloorClick(num)}>Floor {num}</button>
        ))}
      </div>

      {/* Display classroom buttons for the selected floor */}
      {selectedFloor && (
        <div className="classroom-grid">
          <div className="floor-title">Classrooms - Floor {selectedFloor}</div>
          <div className="rectangle-box">
            <div className="grid-container">
              {[...Array(5)].map((_, rowIndex) => (
                <div key={rowIndex} className="row">
                  {[...Array(4)].map((_, colIndex) => {
                    const roomNumber = `6${selectedFloor}${(rowIndex * 4 + colIndex + 1).toString().padStart(2, '0')}`;
                    return (
                      <button key={roomNumber} className="room" onClick={() => handleRoomClick(roomNumber)}>
                        {roomNumber}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal for displaying teacher details */}
      <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Teacher Details"
  className="modal-content"  
  overlayClassName="overlay" 
>
  <button className="modal-close-button" onClick={closeModal}>X</button>
  <div className="teacher-details-container">
    {teacherList.length > 0 ? (
      teacherList.map((teacher) => (
        <div key={teacher.id} className="teacher-card-horizontal">
          <img src={teacher.imageLink} alt={teacher.name} className="teacher-image-horizontal" />
          <div className="teacher-info">
            <h2>{teacher.name}</h2>
            <p><strong>Classroom:</strong> {teacher.classroom}</p>
            <p><strong>Designation:</strong> {teacher.designation}</p>
            <p><strong>Days Available:</strong> {teacher.daysAvailable}</p>
            <p><strong>Floor:</strong> {teacher.floor}</p>
            <p><strong>Website:</strong> <a href={teacher.personalWebsite} target="_blank" rel="noopener noreferrer">{teacher.personalWebsite}</a></p>
            <div className="teacher-actions">
              <button onClick={() => handleEditTeacher(teacher)}>Edit</button>
              <button onClick={() => handleDeleteTeacher(teacher.id)}>Delete</button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No teachers available for this classroom.</p>
    )}
  </div>
</Modal>
</div>
  )}

export default Admin;
