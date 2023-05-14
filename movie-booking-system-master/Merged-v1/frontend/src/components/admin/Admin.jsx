import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Admin.css";
import Navbar from "../navbar/Navbar.jsx";

const Admin = () => {
  return (
    <>
      <Link to="/createuser">
        <button className="createButton">Create a user profile</button>
        <Outlet />
      </Link>
    </>
  );
};

export default Admin;
