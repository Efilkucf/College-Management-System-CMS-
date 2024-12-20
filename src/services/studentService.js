import API from "../api/API";

// Fetch all students
export const getStudents = async () => {
  const response = await API.get("/students");
  return response.data;
};

// Add a new student
export const addStudent = async (student) => {
  const response = await API.post("/students", student);
  return response.data;
};

// Update an existing student
export const updateStudent = async (id, student) => {
  const response = await API.put(`/students/${id}`, student);
  return response.data;
};

// Delete a student
export const deleteStudent = async (id) => {
  await API.delete(`/students/${id}`);
};
