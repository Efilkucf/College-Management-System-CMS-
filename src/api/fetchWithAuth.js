const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}), // Add Authorization header if token exists
    };
  
    const response = await fetch(`http://localhost:8080/api${url}`, {
      ...options,
      headers,
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred while fetching data");
    }
  
    return response.json();
  };
  
  export default fetchWithAuth;
  