
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
export const getLatestBooks = async () => {
  const response = await fetch(`${API_URL}/books?limit=6`);

  if (!response.ok) {
    throw new Error("Failed to fetch latest books");
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
type AddBookData = {
  title: string;
  author: string;
  totalCopies: number;
  userEmail: string;
  image?: string;
  category?: string;
  description?: string;
};

export const addBook = async (data: AddBookData) => {
  const response = await fetch(`${API_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to add book");
  }

  return result;
};
export const getMyBooks = async (email: string) => {
  const response = await fetch(
    `${API_URL}/books?email=${encodeURIComponent(email)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch your books");
  }

  const result = await response.json();
  return Array.isArray(result.data) ? result.data : [];
};

export const updateBook = async (
  id: string,
  data: {
    title: string;
    author: string;
    category?: string;
    description?: string;
    image?: string;
    totalCopies: number;
  }
) => {
  const response = await fetch(`${API_URL}/books/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update book");
  }

  return result;
};

export const deleteBook = async (id: string) => {
  const response = await fetch(`${API_URL}/books/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete book");
  }

  return result;
};
export type GoogleBook = {
  id: string;
  title: string;
  author: string;
  description: string;
  image: string;
  category: string;
};

type GoogleBooksItem = {
  id: string;
  volumeInfo?: {
    title?: string;
    authors?: string[];
    description?: string;
    imageLinks?: { thumbnail?: string };
    categories?: string[];
  };
};

export const searchGoogleBooks = async (
  query: string
): Promise<GoogleBook[]> => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10`
  );

  if (!response.ok) {
    throw new Error("Failed to search books");
  }

  const result = await response.json();

  return (result.items || []).map((item: GoogleBooksItem) => {
    const book = item.volumeInfo;

    return {
      id: item.id,
      title: book?.title || "",
      author: book?.authors?.join(", ") || "Unknown Author",
      description: book?.description || "",
      image: (book?.imageLinks?.thumbnail || "").replace(
        "http://",
        "https://"
      ),
      category: book?.categories?.[0] || "General",
    };
  });
};

export default API_URL;
