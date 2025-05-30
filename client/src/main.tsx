import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {App} from "./App";
import './index.css';

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include", 
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>
);
