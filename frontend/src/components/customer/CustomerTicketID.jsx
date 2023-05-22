import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SignedOutNavbar from "../navbar/SignedOutNavbar";
import CartService from "../../services/CartService";

import "../admin/user.css";
import "../staff/css/staffcheckout.css";

const CustomerTicketID = () => {
    const [bookingRef, setBookingRef] = useState("");
    const customerId = localStorage.getItem("customerId");
    const [cart, setCart] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        getBookingRef();
    }, []);

    const getBookingRef = async () => {
        try {
            const response = await CartService.getCart(customerId);
            const cartData = response.data;
            setCart(cartData);
            setBookingRef(cartData.id);

            const cartDetails = {
                ...cartData,
                isCheckedOut: true,
                ticketIds: [],
                foodDrinkIds: [],
                rewardIds: [],
            };

            await CartService.updateCart(cartDetails);
            console.log("Cart updated successfully");
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    };

    return (
        <div>
            <SignedOutNavbar />
            <div className="topic">
                <br></br>
                <h1>Your ticket has been confirmed.</h1>
                <br></br>
                <h2>Please show this ticket ID for payment and entry to the movie theatre.</h2>
                <h2>For rewards redemption, please show this to our counter staff.</h2>
                <br></br>
                <h1>Booking Reference Number: <span>{bookingRef}</span></h1>
                <br></br>
                <h3>Thank you.</h3>
            </div>
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
