import API from "../api/API";

export const getCourses = async () => {
  try {
    const response = await API.get("/courses");
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const addCourse = async (courseData) => {
  try {
    const response = await API.post("/courses", courseData);
    return response.data;
  } catch (error) {
    console.error("Error adding course:", error);
    throw error;
  }
};

export const deleteCourse = async (courseId) => {
  try {
    await API.delete(`/courses/${courseId}`);
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};
