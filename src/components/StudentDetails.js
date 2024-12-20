import React, { useState, useEffect } from 'react';
import '../styles/StudentDetails.css';

const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({
    studentName: '',
    rollNo: '',
    age: '',
    feesPaid: '',
    feesDue: '',
    courseDetails: '',
    cgpa: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/students', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (!response.ok) throw new Error('Failed to fetch students');

      const data = await response.json();
      setStudents(data || []);
    } catch (error) {
      console.error('Error fetching students:', error);
      alert('Error loading students. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing
      ? `http://localhost:8080/api/students/${editingId}`
      : 'http://localhost:8080/api/students';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(student),
      });

      if (!response.ok) throw new Error('Failed to save student details');

      alert(isEditing ? 'Student updated successfully!' : 'Student saved successfully!');
      fetchStudents();
      resetForm();
    } catch (error) {
      console.error('Error saving student:', error);
      alert('An error occurred while saving student details.');
    }
  };

  const handleEdit = (id) => {
    const studentToEdit = students.find((s) => s.id === id);
    if (studentToEdit) {
      setStudent({
        studentName: studentToEdit.studentName,
        rollNo: studentToEdit.rollNo,
        age: studentToEdit.age,
        feesPaid: studentToEdit.feesPaid,
        feesDue: studentToEdit.feesDue,
        courseDetails: studentToEdit.courseDetails,
        cgpa: studentToEdit.cgpa,
        version: studentToEdit.version,
      });
      setIsEditing(true);
      setEditingId(id);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/students/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        if (!response.ok) throw new Error('Failed to delete student');

        alert('Student deleted successfully!');
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('An error occurred while deleting student details.');
      }
    }
  };

  const resetForm = () => {
    setStudent({
      studentName: '',
      rollNo: '',
      age: '',
      feesPaid: '',
      feesDue: '',
      courseDetails: '',
      cgpa: '',
    });
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <div className="student-details-container">
      <h2>{isEditing ? 'Edit Student' : 'Add Student'}</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(student).map((key) => (
          <input
            key={key}
            type={key === 'age' || key === 'feesPaid' || key === 'feesDue' || key === 'cgpa' ? 'number' : 'text'}
            name={key}
            value={student[key]}
            onChange={handleInputChange}
            placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
            required
          />
        ))}
        <button type="submit">{isEditing ? 'Update' : 'Save'}</button>
        {isEditing && <button onClick={resetForm}>Cancel</button>}
      </form>
      <h2>Student List</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Roll No</th>
              <th>Age</th>
              <th>Fees Paid</th>
              <th>Fees Due</th>
              <th>Course Details</th>
              <th>CGPA</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.studentName}</td>
                <td>{student.rollNo}</td>
                <td>{student.age}</td>
                <td>{student.feesPaid}</td>
                <td>{student.feesDue}</td>
                <td>{student.courseDetails}</td>
                <td>{student.cgpa}</td>
                <td>
                  <button onClick={() => handleEdit(student.id)}>Edit</button>
                  <button onClick={() => handleDelete(student.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentDetails;
