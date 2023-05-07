import './App.css';

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ListUser from "./components/user/ListUser";
import CreateUser from "./components/user/CreateUser"
import UpdateUser from "./components/user/UpdateUser";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path = "/" element = {<ListUser />}></Route>
          <Route exact path = "/users"  element = {<ListUser />}></Route>
          <Route exact path = "/createuser"  element = {<CreateUser />}></Route>
          <Route exact path = "/users/:id"  element = {<UpdateUser />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
