import Home from "../pages/Home";
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

// const privateRoutes: RouteConfig[] = [
//   { path: "/dashboard", component: Dashboard, isPrivate: true },
//   { path: "/profile", component: Dashboard, isPrivate: true }, // Ví dụ
// ];

export { publicRoute };
