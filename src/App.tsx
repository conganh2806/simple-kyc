import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { publicRoute } from "./routes/routes";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {Object.values(publicRoute).map((route, index) => {
          const Page = route.component;
          return (
            <Route key={index} path={route.path} element={<Page />}></Route>
          );
        })}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
