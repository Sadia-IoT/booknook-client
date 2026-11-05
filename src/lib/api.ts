const API_URL = "http://localhost:5000";

export const getBooks = async () => {
  const response = await fetch(`${API_URL}/books`);

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  const result = await response.json();

  return result.data;
};


export default API_URL;