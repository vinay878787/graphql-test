import React from "react";

interface IBook {
  title: string;
  author: string;
  year: number;
  rating: "good" | "bad" | "ugly";
}

export const BooksTable: React.FC<{ books: IBook[] }> = ({ books }) => (
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
      {books.map((book) => (
        <tr key={book.title + book.year}>
          <td className="border px-4 py-2">{book.title}</td>
          <td className="border px-4 py-2">{book.author}</td>
          <td className="border px-4 py-2">{book.year}</td>
          <td className="border px-4 py-2 capitalize">{book.rating}</td>
        </tr>
      ))}
    </tbody>
  </table>
);