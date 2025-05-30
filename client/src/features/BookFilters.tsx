import React from "react";
import { RATINGS, SORT_FIELDS } from "../constants/constant";
import { SelectFilter } from "../components/SelectFilter";

interface BookFiltersProps {
  authors: string[];
  author: string;
  setAuthor: (a: string) => void;
  rating: string | undefined;
  setRating: (r: string | undefined) => void;
  sortBy: string;
  setSortBy: (s: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (o: "asc" | "desc") => void;
  onFilter: (e: React.FormEvent) => void;
}

export const BookFilters: React.FC<BookFiltersProps> = ({
  authors,
  author,
  setAuthor,
  rating,
  setRating,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  onFilter,
}) => (
  <form className="flex flex-wrap gap-4 items-end mb-6" onSubmit={onFilter}>
    <SelectFilter
      label="Author"
      value={author}
      onChange={setAuthor}
      options={authors.map((a) => ({ label: a, value: a }))}
    />
    <SelectFilter
      label="Rating"
      value={rating ?? ""}
      onChange={(val) => setRating(val || undefined)}
      options={RATINGS.map((r) => ({
        label: r.charAt(0).toUpperCase() + r.slice(1),
        value: r,
      }))}
    />
    <SelectFilter
      label="Sort By"
      value={sortBy}
      onChange={setSortBy}
      options={SORT_FIELDS}
    />
    <SelectFilter
      label="Sort Order"
      value={sortOrder}
      onChange={(val) => setSortOrder(val as "asc" | "desc")}
      options={[
        { label: "Ascending", value: "asc" },
        { label: "Descending", value: "desc" },
      ]}
    />
  </form>
);