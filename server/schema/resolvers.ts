import { requireAuth, signJwt } from "../utils/helper-functions/auth.js";
import { books } from "../utils/mock-data/books.js";
import { users } from "../utils/mock-data/users.js";
import type { Response } from "express";

export const resolvers = {
  Query: {
    books: requireAuth(
      (_parent: any, args: any, context: any) => {
        let result = [...books];

        // Filtering
        if (args.author) {
          result = result.filter(book =>
            book.author.toLowerCase().includes(args.author.toLowerCase())
          );
        }
        if (args.rating) {
          result = result.filter(book => book.rating === args.rating);
        }

        // Sorting
        if (args.sortBy) {
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
    login: async (_parent: any, { email, password }: any, { res }: { res: Response }) => {
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) throw new Error("Invalid credentials");
      const token = signJwt({ name: user.name, email: user.email });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      return "success";
    },
    logout: (_parent: any, _args: any, { res }: { res: Response }) => {
      res.clearCookie("token");
      return "logged out";
    },
  },
};