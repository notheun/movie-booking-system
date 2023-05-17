import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListUser from "./components/user/ListUser";
import CreateUser from "./components/user/CreateUser";
import UpdateUser from "./components/user/UpdateUser";
import Home from "./components/home/Home";
import Admin from "./components/admin/Admin";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ListCustomers from "./components/staff/ListCustomer";
import Logout from "./components/login/Logout";
import ListMovie from "./components/staff/ListMovie";
import EditMovie from "./components/manager/EditMovie";
import Movie from "./components/customer/Movie";
import CreateMovie from "./components/manager/CreateMovie";
import CreateMovieTheatre from "./components/manager/CreateMovieTheatre";
function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          {/*<Route exact path="/admin" element={<Admin />}></Route>*/}
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/loggedout" element={<Logout />}></Route>
          <Route exact path="/login/admin" element={<ListUser />}></Route>
          <Route
            exact
            path="/login/admin/createuser"
            element={<CreateUser />}
          ></Route>
          <Route exact path="/login/admin/:id" element={<UpdateUser />}></Route>
          <Route exact path="/login/manager" element={<EditMovie />}></Route>
          <Route
            exact
            path="/login/manager/createmovies"
            element={<CreateMovie />}
          ></Route>
          <Route
            exact
            path="/login/manager/createmovietheatre"
            element={<CreateMovieTheatre />}
          ></Route>
          <Route exact path="/login/staff" element={<ListMovie />}></Route>
          <Route
            exact
            path="/login/staff/checkloyaltypoints"
            element={<ListCustomers />}
          ></Route>
          <Route exact path="/login/:id" element={<Movie />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
