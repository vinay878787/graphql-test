import { requireAuth, signJwt } from "../utils/helper-functions/auth.js";
import { books } from "../utils/mock-data/books.js";
import { users } from "../utils/mock-data/users.js";
import type { Response } from "express";

interface Context {
  user: { name: string; email: string } | null;
  res: Response;
}
interface BooksArgs {
  author?: string;
  rating?: "good" | "bad" | "ugly";
  sortBy?: string;
  sortOrder?: string;
}

const validSortFields = ["title", "author", "year", "rating"];
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const resolvers = {
  Query: {
    books: requireAuth(
      (_parent: unknown, args: BooksArgs, context: Context) => {
        let result = books;

        if (args.author) {
          result = result.filter(book =>
            book.author.toLowerCase().includes(args.author.toLowerCase())
          );
        }
        if (args.rating) {
          result = result.filter(book => book.rating === args.rating);
        }
        if (args.sortBy && validSortFields.includes(args.sortBy)) {
          const sortOrder = args.sortOrder === "desc" ? -1 : 1;
          result.sort((a, b) => {
            if (a[args.sortBy] < b[args.sortBy]) return -1 * sortOrder;
            if (a[args.sortBy] > b[args.sortBy]) return 1 * sortOrder;
            return 0;
          });
        }

        return result;
      }
    ),
  },
  Mutation: {
    login: async (
      _parent: unknown,
      args: { email: string; password: string },
      { res }: Context
    ) => {
      const { email, password } = args;
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) throw new Error("Invalid credentials");
      const token = signJwt({ name: user.name, email: user.email });

      res.cookie("token", token, cookieOptions);

      return "success";
    },
    logout: (_parent: unknown, _args: {}, { res }: Context) => {
      res.clearCookie("token");
      return "logged out";
    },
  },
};