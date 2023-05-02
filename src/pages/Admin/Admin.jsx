import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  return (
    <div>
      <Link to="createUserProfile">
        <button className="createButton">Create a user profile</button>
        <Outlet />
      </Link>
    </div>
  );
};

export default Admin;
