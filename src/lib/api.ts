const API_URL = "http://localhost:5000";

export const getBooks = async () => {
  const response = await fetch(`${API_URL}/books`);

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  const result = await response.json();

  return result.data;
};


type BorrowData = {
  bookId: string;
  userEmail: string;
  borrowDate: string;
  returnDate: string;
};

export const borrowBook = async (data: BorrowData) => {
  const response = await fetch(`${API_URL}/borrows`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to borrow book");
  }

  return result;
};



export default API_URL;