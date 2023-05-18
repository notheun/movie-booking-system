import React, { useState, useEffect, useContext } from "react";
import "./navbar.css";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Link } from "react-router-dom";

function SignedOutNavbar() {
  return (
    <nav className="navbar">
      <div className="nav_left">
        <Link to={"/"} style={{ display: "flex", alignItems: "center" }}>
          <img
            width={"55px"}
            src="/images/logo.png"
            alt="logo"
            draggable={"false"}
          />
          <h2>
            <span className="logo_text_first" style={{ color: "#CE6816" }}>
              Film
            </span>{" "}
            <span>Production</span>{" "}
          </h2>
        </Link>
      </div>
      <div className="nav_right">
        <div className="registration_box">
          <Link to={"/logout"}>
            <button className="mainBtns">
              <LockOpenIcon className="navIcons" />
              <span>Logout</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default SignedOutNavbar;