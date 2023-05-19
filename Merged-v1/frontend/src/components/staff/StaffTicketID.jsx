import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SignedOutNavbar from "../navbar/SignedOutNavbar";
import "../admin/user.css";
// import StaffNavBar from "./StaffNavbar";
import "./css/staffcheckout.css";

export default function StaffTicketID() {
  //need to include a function to generate random number for the ticket ID.
  return (
    <div>
      <SignedOutNavbar />
      {/* <StaffNavBar /> */}
      <div className="topic">
        <br></br>
        <h1>Your ticket has been confirmed.</h1>
        <br></br>
        <h2>
          Please show this ticket ID for payment and entry to movie theatre.
        </h2>
        <h2>For rewards redeemption, please show this to our counter staff.</h2>
        <br></br>
        {/* Include the function here that will generate random ticket ID */}
        <h1>Ticket ID: 12345</h1>
        <br></br>
        <h3>Thank you.</h3>
      </div>
      {/* return everything that was checked out */}
      <div className="loginBox">
        <Link to="/login/staff">
          <button className="mainBtns">Return Home</button>
        </Link>
      </div>
    </div>
  );
}
