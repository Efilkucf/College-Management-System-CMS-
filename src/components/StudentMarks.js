import React, { useState, useEffect } from "react";
import "../styles/StudentMarks.css"; // Import the CSS file

const StudentMarks = () => {
    const [marks, setMarks] = useState([]); // All data
    const [filteredMarks, setFilteredMarks] = useState([]); // Filtered data
    const [search, setSearch] = useState(""); // Search input value

    // Fetch data from backend
    useEffect(() => {
        fetch("http://localhost:8080/api/marks")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Fetched Data:", data);
                setMarks(data); // Store fetched data
                setFilteredMarks(data); // Initially display all data
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    // Handle search button click
    const handleSearch = () => {
        const query = search.toLowerCase();
        if (query === "") {
            setFilteredMarks(marks); // Show all data if search is empty
        } else {
            const filtered = marks.filter(
                (item) =>
                    (item.studentName && item.studentName.toLowerCase().includes(query)) ||
                    (item.rollNo && item.rollNo.toLowerCase().includes(query)) // Search by name or roll number
            );
            setFilteredMarks(filtered);
        }
    };

    return (
        <div className="student-marks">
            <h2>Student Marks</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by name or roll number"
                    value={search}
                    onChange={handleSearchChange}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <table className="marks-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Roll No</th>
                        <th>CGPA</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMarks.length > 0 ? (
                        filteredMarks.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.studentName || "N/A"}</td>
                                <td>{item.rollNo || "N/A"}</td>
                                <td>{item.cgpa || "N/A"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="no-data">
                                No data found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StudentMarks;