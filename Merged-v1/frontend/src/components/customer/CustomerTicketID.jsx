import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SignedOutNavbar from "../navbar/SignedOutNavbar";
// import CustomerNavbar from "./CustomerNavbar";

export default function CustomerTicketID() {
  //able to generate random ticketID, However the ticketID is not saved into backend.
  const [num, setNum] = useState(0);
  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  useEffect(() => {
    setNum(randomNumberInRange(11111, 99999));
  }, []);

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
        <h1>Ticket ID: {num}</h1>
        <br></br>
        <h3>Thank you.</h3>
      </div>
      {/* return everything that was checked out */}
      <div className="loginBox">
        <Link to="/:id">
          <button className="mainBtns">Return Home</button>
        </Link>
      </div>
    </div>
  );
}
