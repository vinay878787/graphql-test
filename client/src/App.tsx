import { useQuery, gql } from "@apollo/client";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

const AUTH_CHECK_QUERY = gql`
  query {
    books {
      title
    }
  }
`;

export const App = () => {
  const { loading, error } = useQuery(AUTH_CHECK_QUERY, {
    fetchPolicy: "network-only",
  });

  if (loading) return <div>Loading...</div>;

  if (error) return <Login />;

  return <Home />;
};
