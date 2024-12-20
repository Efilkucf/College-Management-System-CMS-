import React, { useState } from 'react';
import { logout } from '../services/authService';
import StudentDetails from './StudentDetails';
import StudentMarks from './StudentMarks';
import CourseDetails from './CourseDetails';
import FeesDetails from './FeesDetails';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('marks'); // Default tab
  const [isTeacher, setIsTeacher] = useState(false);
  const [passcode, setPasscode] = useState(''); // State to store passcode input
  const [errorMessage] = useState(''); // State to show error message

  const handleLogout = () => {
    logout(); // Call logout function
    window.location.href = '/'; // Redirect to login
  };

  const handlePasscodeSubmit = () => {
    console.log('Passcode:', passcode); // Debug passcode value
    console.log('Token:', localStorage.getItem('token')); // Debug token value
  
    fetch('http://localhost:8080/api/validate-passcode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ passcode }),
    })
      .then((response) => {
        console.log('Response Status:', response.status);
        if (response.ok) {
          return response.text(); // Or .json(), depending on your backend response
        } else {
          throw new Error('Invalid passcode');
        }
      })
      .then((data) => {
        console.log('Validation success:', data);
        setIsTeacher(true);
      })
      .catch((error) => {
        console.error('Error:', error);
        alert(error.message || 'An error occurred.');
      });     
  };
  
  

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Student Portal</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <nav className="dashboard-tabs">
        <button
          onClick={() => setActiveTab('details')}
          className={activeTab === 'details' ? 'active' : ''}
        >
          Student Details
        </button>
        <button
          onClick={() => setActiveTab('marks')}
          className={activeTab === 'marks' ? 'active' : ''}
        >
          Student Marks
        </button>
        <button
          onClick={() => setActiveTab('courses')}
          className={activeTab === 'courses' ? 'active' : ''}
        >
          Course Details
        </button>
        <button
          onClick={() => setActiveTab('fees')}
          className={activeTab === 'fees' ? 'active' : ''}
        >
          Fees Details
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === 'details' && isTeacher && <StudentDetails />}
        {activeTab === 'marks' && <StudentMarks />}
        {activeTab === 'courses' && <CourseDetails />}
        {activeTab === 'fees' && <FeesDetails />}
        {activeTab === 'details' && !isTeacher && (
          <div className="teacher-auth">
            <h2>Teacher Access</h2>
            <div className="passcode-container">
              <input
                type="password"
                id="passcode-input"
                placeholder="Enter passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
              />
              <button onClick={handlePasscodeSubmit}>Enter</button>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
