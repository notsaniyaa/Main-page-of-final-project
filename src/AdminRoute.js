import { Navigate } from "react-router-dom";
import useUserRole from "./hooks/useUserRole";

export const AdminRoute = ({ children }) => {
  const { role, loading } = useUserRole(); // ← обязательно распаковываем loading

  if (loading) return <p>Loading...</p>;
  if (role !== "admin") return <Navigate to="/" />;

  return children;
};
