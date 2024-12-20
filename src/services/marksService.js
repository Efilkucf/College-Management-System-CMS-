import axios from '../api/API';

export const getMarks = async () => {
  const response = await axios.get('/marks', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data; // Assuming backend returns an array of marks
};
