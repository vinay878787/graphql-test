import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";

const BOOKS_QUERY = gql`
  query Books(
    $author: String
    $rating: Rating
    $sortBy: String
    $sortOrder: String
  ) {
    books(
      author: $author
      rating: $rating
      sortBy: $sortBy
      sortOrder: $sortOrder
    ) {
      title
      author
      year
      rating
    }
  }
`;

const ALL_AUTHORS_QUERY = gql`
  query AllAuthors {
    books {
      author
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

const RATINGS = ["good", "bad", "ugly"] as const;
const SORT_FIELDS = [
  { label: "Year", value: "year" },
  { label: "Author", value: "author" },
];

export const Home: React.FC = () => {
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState<string | undefined>(undefined);
  const [sortBy, setSortBy] = useState<string>("year");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // For table data
  const { data, loading, error, refetch } = useQuery(BOOKS_QUERY, {
    variables: { author, rating, sortBy, sortOrder },
    fetchPolicy: "network-only",
  });

  // For all authors (unfiltered)
  const { data: allAuthorsData } = useQuery(ALL_AUTHORS_QUERY);

  // Get unique authors from all books (not filtered)
  const authors: string[] =
    allAuthorsData && allAuthorsData.books
      ? Array.from(new Set(allAuthorsData.books.map((book: any) => book.author)))
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
      <form
        className="flex flex-wrap gap-4 items-end mb-6"
        onSubmit={handleFilter}
      >
        <div>
          <label className="block text-gray-700 mb-1">Author</label>
          <select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">All</option>
            {authors.map((a: string) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Rating</label>
          <select
            value={rating ?? ""}
            onChange={(e) => setRating(e.target.value || undefined)}
            className="border px-2 py-1 rounded"
          >
            <option value="">All</option>
            {RATINGS.map((r) => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            {SORT_FIELDS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Sort Order</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
            className="border px-2 py-1 rounded"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </form>

      {loading && <p>Loading...</p>}
      {error && (
        <p className="text-red-500">Error: {error.message}</p>
      )}
      {data && data.books && (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Author</th>
              <th className="border px-4 py-2">Year</th>
              <th className="border px-4 py-2">Rating</th>
            </tr>
          </thead>
          <tbody>
            {data.books.map((book: any, idx: number) => (
              <tr key={idx}>
                <td className="border px-4 py-2">{book.title}</td>
                <td className="border px-4 py-2">{book.author}</td>
                <td className="border px-4 py-2">{book.year}</td>
                <td className="border px-4 py-2 capitalize">{book.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {data && data.books && data.books.length === 0 && (
        <p className="text-gray-500 mt-4">No books found.</p>
      )}
    </div>
  );
};