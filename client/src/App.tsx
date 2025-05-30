import { Login } from "./pages/Login";

export const App = () => {
  return (
    <>
      {localStorage.getItem("token") ? (
        <div>
          <h1>Welcome to the React App</h1>
          <p>This is a simple React application.</p>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};
