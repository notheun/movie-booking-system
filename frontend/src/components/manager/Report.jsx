import React, { useState } from "react";

import ManagerNavbar from "./ManagerNavbar";
import SignedOutNavbar from "../navbar/SignedOutNavbar";

import ReportService from "../../services/ReportService";

import { useNavigate } from "react-router-dom";

import "./css/createmovie.css";

export default function Report() {
  const [report, setReport] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const navigate = useNavigate();

  const createReport = () => {
    ReportService.generateReport()
      .then((res) => {
        setReport(res.data);
        setIsGenerated(true);
      })
      .catch((e) => {
        console.log(e);
      })

    return;
  };

  return (
    <>
      <SignedOutNavbar />
      <ManagerNavbar />
      <div className="topic">
        <h1>Generate Report</h1>
      </div>
      {isGenerated ? (
        <div className="report">
          <div>
            <pre>{report}</pre>
          </div>    
          <br></br>    
          <br></br>
          <div className="movieBox">
            <button className="mainBtns" onClick={() => {navigate(-1)}}>
              Return
            </button>
          </div>
        </div>
      ) : (
        <div className="movieBox">
          <button className="mainBtns" onClick={createReport}>
            Create report
          </button>
        </div>
      )}
    </>
  );
}