import API from '../api/API';

export const getFees = async (course) => {
  const response = await API.get(`/fees`, { params: { course } });
  return response.data;
};
