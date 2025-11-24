import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { privateRoute, publicRoute } from "./routes/routes";
import Header from "./components/Header";
import PrivateRoute from "./routes/PrivateRoute";
import GuestRoute from "./routes/GuestRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<GuestRoute />}>
          {Object.values(publicRoute).map((route, index) => {
            const Page = route.component;
            return (
              <Route key={index} path={route.path} element={<Page />}></Route>
            );
          })}
        </Route>

        <Route element={<PrivateRoute />}>
          {Object.values(privateRoute).map((route, index) => {
            const Page = route.component;
            return (
              <Route key={index} path={route.path} element={<Page />}></Route>
            );
          })}
        </Route>
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
