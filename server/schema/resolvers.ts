import { requireAuth, signJwt } from "../utils/helper-functions/auth.js";
import { books } from "../utils/mock-data/books.js";
import { users } from "../utils/mock-data/users.js";


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
    login: (_parent: any, { email, password }: any) => {
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) throw new Error("Invalid credentials");
      return signJwt({ name: user.name, email: user.email });
    },
  },
};