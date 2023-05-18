import React from "react";
import ManagerNavbar from "./ManagerNavbar";
import SignedOutNavbar from "../navbar/SignedOutNavbar";
import { Link } from "react-router-dom";

import "./css/createmovie.css";

export default function Report() {
  const getReportData = () => {
    return;
  };
  return (
    <>
      <SignedOutNavbar />
      <ManagerNavbar />
      <div className="topic">
        <h1>Generate Report</h1>
      </div>
      <div className="movieBox">
        <button className="mainBtns" onClick={getReportData}>
          Create report
        </button>
      </div>
    </>
  );
}
