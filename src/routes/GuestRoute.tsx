import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../app/store";

const GuestRoute = () => {
  const { token } = useAppSelector((state) => state.auth);

  if (token) {
    return <Navigate to="/kyc" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
