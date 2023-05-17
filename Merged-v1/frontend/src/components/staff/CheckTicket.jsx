import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SignedOutNavbar from "../navbar/SignedOutNavbar";
import "../admin/user.css";
import DropNavbar from "./StaffNavbar";

export default function CheckTicket() {
  return (
    <div>
      <SignedOutNavbar />
      <DropNavbar />
      <div className="topic">
        <h1>Check Tickets</h1>
      </div>

      {/* Include search function: search ticket id */}
    </div>
  );
}
