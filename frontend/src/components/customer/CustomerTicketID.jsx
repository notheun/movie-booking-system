import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SignedOutNavbar from "../navbar/SignedOutNavbar";

import CartService from "../../services/CartService";

import "../admin/user.css";
import "../staff/css/staffcheckout.css";

const CustomerTicketID = () => {
    const [bookingRef, setBookingRef] = useState("");
    const customerId = localStorage.getItem("customerId");

    const navigate = useNavigate();

    useEffect(() => {
        getBookingRef();
    }, []);

    const getBookingRef = () => {
        CartService.getCart(customerId)
            .then((res) => {
                setBookingRef(res.data.id);
                // console.log(bookingRef);
            })
    }
  
    return (
        <div>
        <SignedOutNavbar />
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
            <h1>Booking Reference Number: <span>{bookingRef}</span></h1>
            <br></br>
            <h3>Thank you.</h3>
        </div>
        {/* return everything that was checked out */}
        <div className="loginBox">
            <button 
                className="mainBtns"
                onClick={() => navigate(`/${customerId}`)}
            >
                Return Home
            </button>
        </div>
        </div>
    );
}

export default CustomerTicketID;
