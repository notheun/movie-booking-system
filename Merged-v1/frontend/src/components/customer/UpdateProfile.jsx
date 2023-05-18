import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignedOutNavbar from "../navbar/SignedOutNavbar";
import "./css/UpdateProfile.css";
// import { ObjectId } from "bson";
// import CustomerNavbar from "./CustomerNavbar";

export default function UpdateProfile() {
  const [user, setUser] = useState({
    // id: null,
    // username: "",
    email: "",
    password: "",
    // role: "customer",
    // isActive: true,
    seatPref: "",
    confirmPassword: "",
  });

  const handleChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
  };

  const updatechanges = () => {
    return;
  };

  return (
    <div>
      <SignedOutNavbar />
      {/* <CustomerNavbar /> */}
      <div className="loginBox">
        <div className="loginHeader">
          <h3>Update Profile</h3>
          <div className="loginHeaderInnerBox">
            <img
              width={"45px"}
              src="/images/logo.png"
              alt="logo"
              draggable={"false"}
            />
            <h3>
              <span className="appName_loginModal">Film</span> Production
            </h3>
          </div>
          <div className="profileBox">
            <div className="profileForm">
              <input
                required
                placeholder="Email"
                autoComplete="false"
                type="email"
                name="email"
                value={user.email}
                onChange={handleChangeInput}
              />
              <select
                name="seatPref"
                onChange={handleChangeInput}
                value={user.seatPref}
              >
                <option disabled selected>
                  Seat Preference
                </option>
                <option value="front">Front</option>
                <option value="middle">Middle</option>
                <option value="end">End</option>
              </select>
              <input
                required
                placeholder="New Password"
                onChange={handleChangeInput}
                value={user.password}
                autoComplete="false"
                type="password"
                name="password"
                id=""
              />

              <input
                required
                placeholder="Confirm New Password"
                autoComplete="false"
                onChange={handleChangeInput}
                value={user.confirmPassword}
                type="password"
                name="confirmPassword"
                id=""
              />
            </div>
          </div>
        </div>
        <button className="mainBtns" onClick={updatechanges}>
          Update Profile
        </button>
        <Link to="/:id">
          <button className="mainBtns">Return</button>
        </Link>
      </div>
    </div>
  );
}
