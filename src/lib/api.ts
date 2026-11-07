const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getBooks = async () => {
  const response = await fetch(`${API_URL}/books`);

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  const result = await response.json();

 return Array.isArray(result.data) ? result.data : [];
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
export const getMyBorrows = async (email: string) => {
  const response = await fetch(
    `${API_URL}/borrows?email=${encodeURIComponent(email)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch borrowed books");
  }

  const result = await response.json();
  return result.data;
};
export const returnBook = async (borrowId: string) => {
  const response = await fetch(
    `${API_URL}/borrows/${borrowId}/return`,
    {
      method: "PATCH",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to return book");
  }

  return result;
};


export default API_URL;