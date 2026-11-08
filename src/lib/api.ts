
import { authClient } from "@/lib/auth-client";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const getAuthToken = async () => {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error("Could not get access token");
  }

  return data.token;
};

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
  const token = await getAuthToken();

  const response = await fetch(`${API_URL}/borrows`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
  const token = await getAuthToken();

  const response = await fetch(
    `${API_URL}/borrows?email=${encodeURIComponent(email)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch borrowed books");
  }

  const result = await response.json();
  return result.data;
};

export const returnBook = async (borrowId: string) => {
  const token = await getAuthToken();

  const response = await fetch(
    `${API_URL}/borrows/${borrowId}/return`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to return book");
  }

  return result;
};

export default API_URL;
