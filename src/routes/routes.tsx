import Home from "../pages/Home";
import Kyc from "../pages/Kyc";
import Login from "../pages/Login";
import Register from "../pages/Register";

interface RouteConfig {
  path: string;
  component: React.ComponentType;
  layout?: React.ComponentType<any> | null;
  isPrivate?: boolean;
}

const publicRoute: Record<string, RouteConfig> = {
  home: {
    path: "/",
    component: Home,
  },
  login: {
    path: "/login",
    component: Login,
  },
  register: {
    path: "/register",
    component: Register,
  },
};

const privateRoute: Record<string, RouteConfig> = {
  kyc: {
    path: "/kyc",
    component: Kyc,
  },
};

export { publicRoute, privateRoute };
