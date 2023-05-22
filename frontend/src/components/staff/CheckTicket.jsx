import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SignedOutNavbar from "../navbar/SignedOutNavbar";
import StaffNavBar from "./StaffNavbar";

import TicketService from "../../services/TicketService";
import MovieService from "../../services/MovieService";

import "../admin/user.css";

export default function CheckTicket() {
  const [referenceNo, setReferenceNo] = useState("");
  const [ticket, setTicket] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    getTicket();
  },[referenceNo])

  useEffect(() => {
    setIsValid(Object.keys(ticket).length > 0);
  }, [ticket]);

  const handleChangeInput = (e) => {
    setReferenceNo(e.target.value);
  };

  // assumption - staff can use barcode scanner instead of typing

  const getTicket = () => {
    TicketService.checkTicket(referenceNo)
      .then((res) => {
        console.log(res);
        setTicket(res.data);
        setIsValid(true);
        console.log(ticket);
      })
      .catch((e) => {
        console.log(e);
      })
  }

  // const getMovie = () => {
  //   MovieService.
  // }

  return (
    <div>
      <SignedOutNavbar />
      <StaffNavBar />
      <div className="topic">
        <h1>Check Tickets</h1>
        <input 
          type="text"
          name="referenceNo"
          onChange={handleChangeInput}
        />
      </div>
      {isValid ? (
        <ul>
          <li>Reference Number: {ticket.referenceNo}</li>
          <li>Seat Number: {ticket.seatNumber}</li>
        </ul>
      ) : (
        ""
      )}

    </div>
  );
}
