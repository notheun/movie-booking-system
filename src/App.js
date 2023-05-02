import "./App.css";
//import FormPages from "./pages/FormPages/FormPages";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import CreateUserProfile from "./pages//createUserProfile/CreateUserProfile";
import Admin from "./pages/Admin/Admin";
//http://www.omdbapi.com/?apikey=c032e2d7

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="admin" element={<Admin />}>
          <Route path="createUserProfile" element={<CreateUserProfile />} />
        </Route>

        {/* https://netflix/admin/createProfile  */}

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
