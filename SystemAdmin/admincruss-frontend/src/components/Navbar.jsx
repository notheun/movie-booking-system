import React from "react";
import { Link } from "react-router-dom";
//import "../App.css";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <img
        width={"55px"}
        src="/images/logo.png"
        alt="logo"
        draggable={"false"}
      />
      <h2>
        <span className="appName_loginModal">Film</span> Production
      </h2>

      {/*
            <ul>
                <li>
                    <Link to={"/users"}>Users</Link>
                </li>
                <li>
                    <Link to={"/createuser"}>Create</Link>
                </li>
            </ul>
            */}
    </div>
  );
}
