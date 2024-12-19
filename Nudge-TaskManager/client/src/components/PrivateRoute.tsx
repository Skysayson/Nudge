// components/PrivateRoute.tsx
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const token = localStorage.getItem("jwtToken");
  console.log("Token:", token); // Log the token value

  if (!token) {
    console.log("No token found, redirecting to login");
    return <Navigate to="/" />;
  }

  console.log("Token found, rendering Dashboard");
  return element; // Render the protected component (Dashboard)
};

export default PrivateRoute;
