import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema/type-def.js";
import { resolvers } from "./schema/resolvers.js";
import { verifyJwt } from "./utils/helper-functions/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@as-integrations/express5";
import express from "express";
import http from "http";

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(cookieParser());
app.use(
  "/graphql",
  cors<cors.CorsRequest>({
    origin: ["http://localhost:3000"],
    credentials: true,
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      // Read token from cookie
      const token = req.cookies?.token;
      let user = null;
      if (token) {
        user = verifyJwt(token);
      }
      return { user, res };
    },
  })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve)
);
console.log(`Server ready at http://localhost:4000/graphql`);
