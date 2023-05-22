import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import UserService from "../../services/UserService";
import SignedOutNavbar from "../navbar/SignedOutNavbar";

import "./css/updateprofile.css";

const UpdateProfile = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    seatPref: "",
    confirmPassword: "",
  });

  const [prevData, setPrevData] = useState({
    username: "",
    email: "",
    password: "",
    seatPref: "",
    confirmPassword: "",
  });

  useEffect(() => {
    getUser(customerId);
  }, []);

  const navigate = useNavigate();
  const customerId = localStorage.getItem("customerId");

  // get existing info
  const getUser = (customerId) => {
    UserService.getUserById(customerId)
      .then((res) => {
        setPrevData(res.data);
        // console.log(prevData);
      })
      .catch((e) => {
        console.log("User profile not found");
      });
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setUserDetails((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const isPasswordValid = () => {
    if (userDetails.password === userDetails.confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  const isEmailValid = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(userDetails.email);
  };

  // use existing data if fields are empty
  const updateUser = () => {
    userDetails.username = prevData.username;
    // console.log(userDetails);    

    if (userDetails.email.trim() === "") {
        userDetails.email = prevData.email;
    } else {
      if (!isEmailValid()) {
        alert("Please enter a valid email address");
        return;
      }
    }
  
    if (userDetails.seatPref === "") {
      userDetails.seatPref = prevData.seatPref;
      console.log(userDetails.seatPref);
      console.log(prevData.seatPref)
    }
  
    if (userDetails.password === "") {
      userDetails.password = prevData.password;
    } else {
      if (!isPasswordValid()) {
        alert("Password does not match");
        return;
      }
    }
  
    delete userDetails.confirmPassword;

    // console.log(userDetails);
  
    UserService.updateProfile(userDetails)
      .then((res) => {
        setUserDetails((prev) => ({
            ...prev,
            email: userDetails.email,
            password: userDetails.password,
            seatPref: userDetails.seatPref,
        }));
        console.log(userDetails);
        alert("Update successful");
        navigate(-1);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  

  const returnPage = () => {
    navigate(-1);
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
                value={userDetails.email}
                onChange={handleChangeInput}
              />
              <span className="smolFont">Current Email: {prevData.email}</span>
              <select
                name="seatPref"
                onChange={handleChangeInput}
                value={userDetails.seatPref}
              >
                {/* <option disabled selected> */}
                <option hidden>Seat Preference</option>
                <option value="front">Front</option>
                <option value="middle">Middle</option>
                <option value="end">End</option>
              </select>
              <span className="smolFont">Current Seat Preference: {prevData.seatPref}</span>
              <input
                required
                placeholder="New Password"
                onChange={handleChangeInput}
                value={userDetails.password}
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
                value={userDetails.confirmPassword}
                type="password"
                name="confirmPassword"
                id=""
              />
            </div>
          </div>
          <span className="smolFont">
            Please only fill in fields that you wish to update, and leave the
            other fields empty.
          </span>
        </div>
        <button className="mainBtns" onClick={updateUser}>
          Update Profile
        </button>
        <button className="mainBtns" onClick={returnPage}>
          Return
        </button>
      </div>
    </div>
  );
};

export default UpdateProfile;
