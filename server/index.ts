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
const CORS_ORIGIN = process.env.CORS_ORIGIN;

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
    origin: [CORS_ORIGIN],
    credentials: true,
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      const token = req.cookies?.token;
      let user = null;
      if (token) {
        user = verifyJwt(token);
      }
      return { user, res };
    },
  })
);

const PORT = process.env.PORT || 4000;

await new Promise<void>((resolve) =>
  httpServer.listen({ port: PORT }, resolve)
);
console.log(`Server ready at http://localhost:${PORT}/graphql`);
