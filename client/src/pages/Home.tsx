import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { BOOKS_QUERY, ALL_AUTHORS_QUERY, LOGOUT_MUTATION } from "../constants/constant";
import { BookFilters } from "../features/BookFilters";
import { BooksTable } from "../features/BookTable";

interface IBook {
  title: string;
  author: string;
  year: number;
  rating: "good" | "bad" | "ugly";
}

export const Home: React.FC = () => {
  const [author, setAuthor] = useState<string>("");
  const [rating, setRating] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string>("year");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { data, loading, error, refetch } = useQuery(BOOKS_QUERY, {
    variables: { author, rating, sortBy, sortOrder },
    fetchPolicy: "network-only",
  });

  const { data: allAuthorsData } = useQuery(ALL_AUTHORS_QUERY);

  const authors: string[] =
    allAuthorsData?.books
      ? Array.from(new Set(allAuthorsData?.books.map((book: IBook) => book?.author)))
      : [];

  const [logout] = useMutation(LOGOUT_MUTATION);

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    refetch({ author, rating, sortBy, sortOrder });
  };

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Book List</h1>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
          onClick={handleLogout}
        >
          logout
        </button>
      </div>
      <BookFilters
        authors={authors}
        author={author}
        setAuthor={setAuthor}
        rating={rating}
        setRating={setRating}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onFilter={handleFilter}
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error?.message}</p>}
      {data?.books && <BooksTable books={data?.books} />}
      {data?.books && data?.books?.length === 0 && (
        <p className="text-gray-500 mt-4">No books found.</p>
      )}
    </div>
  );
};