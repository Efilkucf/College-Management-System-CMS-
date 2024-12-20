import React, { useState, useEffect } from 'react';
import '../styles/FeesDetails.css';

const FeesDetails = () => {
  const [fees, setFees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/fees', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setFees(data || []);
      })
      .catch((error) => console.error('Error fetching fees:', error));
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      alert('Please enter a search term');
      return;
    }

    const result = fees.find(
      (fee) =>
        fee.studentName.toLowerCase() === searchTerm.toLowerCase() ||
        fee.rollNo.toLowerCase() === searchTerm.toLowerCase()
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
    <div className="fees-details">
      <h2>Fees Details</h2>
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
                <th>Fees Paid</th>
                <th>Fees Due</th>
                <th>Course</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{searchResult.studentName}</td>
                <td>{searchResult.rollNo}</td>
                <td>{searchResult.feesPaid}</td>
                <td>{searchResult.feesDue}</td>
                <td>{searchResult.courseDetails}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <h3>All Fees Details:</h3>
      <table className="details-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Fees Paid</th>
            <th>Fees Due</th>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee) => (
            <tr key={fee.id}>
              <td>{fee.studentName}</td>
              <td>{fee.rollNo}</td>
              <td>{fee.feesPaid}</td>
              <td>{fee.feesDue}</td>
              <td>{fee.courseDetails}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeesDetails;
