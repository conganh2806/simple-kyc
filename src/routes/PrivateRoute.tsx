import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  const location = useLocation();

  if (token) {
    return <Outlet />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
