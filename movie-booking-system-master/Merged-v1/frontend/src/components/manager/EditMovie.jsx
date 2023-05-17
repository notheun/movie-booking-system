import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ManagerNavbar from "./ManagerNavbar";
import SignedOutNavbar from "../navbar/SignedOutNavbar";

export default function EditMovie() {
  return (
    <div>
      <SignedOutNavbar />
      <ManagerNavbar />
    </div>
  );
}
