import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function HomeRoute() {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Navigate to="/" replace /> : <Outlet />;
}
