import { useQuery} from "@apollo/client";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { AUTH_CHECK_QUERY } from "./constants/constant";

export const App = () => {
  const { loading, error } = useQuery(AUTH_CHECK_QUERY, {
    fetchPolicy: "network-only",
  });

  if (loading) return <div>Loading...</div>;

  if (error) return <Login />;

  return <Home />;
};
