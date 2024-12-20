import React, { useState, useEffect } from 'react';
import '../styles/CourseDetails.css';

const CourseDetails = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/courses', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setCourses(data || []);
      })
      .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert('Please enter a search term');
      return;
    }

    const result = courses.find(
      (course) =>
        course.studentName.toLowerCase() === searchTerm.toLowerCase() ||
        course.rollNo.toLowerCase() === searchTerm.toLowerCase()
    );

    setSearchResult(result || null);

    if (!result) {
      alert('No results found for the search term');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="course-details">
      <h2>Course Details</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by student name or roll number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {searchResult && (
        <div className="result">
          <h3>Search Result:</h3>
          <table className="details-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll No</th>
                <th>Course</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{searchResult.studentName}</td>
                <td>{searchResult.rollNo}</td>
                <td>{searchResult.courseDetails}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <h3>All Course Details:</h3>
      <table className="details-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.studentName}</td>
              <td>{course.rollNo}</td>
              <td>{course.courseDetails}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseDetails;
