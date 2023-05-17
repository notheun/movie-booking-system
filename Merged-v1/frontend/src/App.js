import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Logout from "./components/logout/Logout";
import Register from "./components/register/Register";

import CreateUser from "./components/admin/CreateUser";
import ListUser from "./components/admin/ListUser";
import UpdateUser from "./components/admin/UpdateUser";

import CreateFoodDrinks from "./components/manager/CreateFoodDrinks";
import CreateMovies from "./components/manager/CreateMovies";
import CreateTheatre from "./components/manager/CreateTheatre";
import ManageFoodDrinks from "./components/manager/ManageFoodDrinks";
import ManageMovie from "./components/manager/ManageMovie";
import ManageTheatre from "./components/manager/ManageTheatre";
import Report from "./components/manager/Report";

import CheckTicket from "./components/staff/CheckTicket";
import ListCustomers from "./components/staff/ListCustomer";
import StaffBookMovie from "./components/staff/StaffBookMovie";
import StaffCheckout from "./components/staff/StaffCheckout";
import StaffFoodBev from "./components/staff/StaffFoodBev";
import StaffMovies from "./components/staff/StaffMovies";
import StaffRedeem from "./components/staff/StaffRedeem";
import StaffRewards from "./components/staff/StaffRewards";
import StaffTicketID from "./components/staff/StaffTicketID";

import CustomerBookMovie from "./components/customer/CustomerBookMovie";
import CustomerCheckout from "./components/customer/CustomerCheckout";
import CustomerFoodBev from "./components/customer/CustomerFoodBev";
import CustomerRewards from "./components/customer/CustomerRewards";
import CustomerTicketID from "./components/customer/CustomerTicketID";
import CustomerMovies from "./components/customer/CustomerMovies";
import UpdateProfile from "./components/customer/UpdateProfile";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/logout" element={<Logout />}></Route>
          <Route exact path="/register" element={<Register />}></Route>

          <Route exact path="/login/admin" element={<ListUser />}></Route>
          <Route
            exact
            path="/login/admin/createuser"
            element={<CreateUser />}
          ></Route>
          <Route exact path="/login/admin/:id" element={<UpdateUser />}></Route>

          <Route exact path="/login/manager" element={<ManageMovie />}></Route>
          <Route
            exact
            path="/login/manager/createmovies"
            element={<CreateMovies />}
          ></Route>
          <Route
            exact
            path="/login/manager/createfb"
            element={<CreateFoodDrinks />}
          ></Route>
          <Route
            exact
            path="/login/manager/editfb"
            element={<ManageFoodDrinks />}
          ></Route>
          <Route
            exact
            path="/login/manager/createmovietheatre"
            element={<CreateTheatre />}
          ></Route>
          <Route
            exact
            path="/login/manager/editmovietheatre"
            element={<ManageTheatre />}
          ></Route>
          <Route
            exact
            path="/login/manager/report"
            element={<Report />}
          ></Route>

          <Route exact path="/login/staff" element={<StaffMovies />}></Route>
          <Route
            exact
            path="/login/staff/checkloyaltypoints"
            element={<ListCustomers />}
          ></Route>
          <Route
            exact
            path="/login/staff/checkloyaltypoints/rewards"
            element={<StaffRewards />}
          ></Route>
          <Route
            exact
            path="/login/staff/:movieid"
            element={<StaffBookMovie />}
          ></Route>
          <Route
            exact
            path="/login/staff/viewfb"
            element={<StaffFoodBev />}
          ></Route>
          <Route
            exact
            path="/login/staff/checkout"
            element={<StaffCheckout />}
          ></Route>
          <Route
            exact
            path="/login/staff/checkout/ticketid"
            element={<StaffTicketID />}
          ></Route>
          <Route
            exact
            path="/login/staff/checkticket"
            element={<CheckTicket />}
          ></Route>

          <Route exact path="/:id" element={<CustomerMovies />}></Route>
          <Route exact path="/:id/viewfb" element={<CustomerFoodBev />}></Route>
          <Route
            exact
            path="/:id/rewards"
            element={<CustomerRewards />}
          ></Route>
          <Route
            exact
            path="/:id/:movieid"
            element={<CustomerBookMovie />}
          ></Route>
          <Route
            exact
            path="/:id/checkout"
            element={<CustomerCheckout />}
          ></Route>
          <Route
            exact
            path="/:id/checkout/ticketid"
            element={<CustomerTicketID />}
          ></Route>
          <Route
            exact
            path="/:id/updateprofile"
            element={<UpdateProfile />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
