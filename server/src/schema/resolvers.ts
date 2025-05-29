import { signJwt } from "../utils/helper-functions/auth.js";
import { books } from "../utils/mock-data/books.js";
import { users } from "../utils/mock-data/users.js";


export const resolvers = {
  Query: {
    books: (_parent: any, _args: any, context: any) => {
      if (!context.user) throw new Error("Unauthorized");
      return books;
    },
  },
  Mutation: {
    login: (_parent: any, { email, password }: any) => {
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) throw new Error("Invalid credentials");
      return signJwt({ name: user.name, email: user.email });
    },
  },
};