import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

export const App = () => {
  return (
    <>
      {localStorage.getItem("token") ? (
       <Home/>
      ) : (
        <Login />
      )}
    </>
  );
};
