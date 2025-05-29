import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./src/schema/type-def.js";
import { resolvers } from "./src/schema/resolvers.js";
import { verifyJwt } from "./src/utils/helper-functions/auth.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const authHeader = req.headers.authorization || "";
    let user = null;
    if (authHeader.startsWith("Bearer ")) {
      const token = authHeader.replace("Bearer ", "");
      user = verifyJwt(token);
    }
    return { user };
  },
});

console.log(`🚀  Server ready at: ${url}`);