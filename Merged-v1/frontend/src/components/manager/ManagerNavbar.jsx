import React from "react";
import { Link } from "react-router-dom";

import "./css/managernavbar.css";

export default function ManagerNavbar() {
  return (
    <div className="topnav">
      <div className="dropdown">
        <button className="topnav">Movies</button>
        <div className="dropdown-content">
          <Link to="/login/manager/createmovies" className="wordings">
            Create Movies
          </Link>
          <Link to="/login/manager" className="wordings">
            Edit Movies
          </Link>
          <Link to="/login/manager/createmovietheatre" className="wordings">
            Create Movies theatre
          </Link>
          <Link to="/login/manager/editmovietheatre" className="wordings">
            Edit Movies theatre
          </Link>
        </div>
      </div>
      <div className="dropdown">
        <button className="topnav">F&B</button>
        <div className="dropdown-content">
          <Link to="/login/manager/createfb" className="wordings">
            Create F&B
          </Link>
          <Link to="/login/manager/editfb" className="wordings">
            Edit F&B
          </Link>
        </div>
      </div>
      <div class="dropdown">
        <Link to="/login/manager/report" className="wordings">
          Generate report
        </Link>
      </div>
    </div>
  );
}