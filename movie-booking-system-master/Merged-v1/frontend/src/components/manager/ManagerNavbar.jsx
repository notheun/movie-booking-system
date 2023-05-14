import React from "react";
import "./ManagerNavbar.css";
import { Link } from "react-router-dom";

export default function ManagerNavbar() {
  return (
    <>
      <div class="topnav">
        <div class="dropdown">
          <button class="topnav">Movies</button>
          <div class="dropdown-content">
            <Link to={"/login/manager/createmovies"} className="wordings">
              <a href="createMovies">Create Movies</a>
            </Link>
            <Link to={"/login/manager"} className="wordings">
              <a href="editMovies">Edit Movies</a>
            </Link>
            <Link to={"/login/manager/createmovietheatre"} className="wordings">
              <a href="createMovies">Create Movies theatre</a>
            </Link>
            <Link to={"/login/manager/viewmovietheatre"} className="wordings">
              <a href="createMovies">View Movies theatre</a>
            </Link>
          </div>
        </div>
        <div class="dropdown">
          <button class="topnav">F&B</button>
          <div class="dropdown-content">
            <Link to={"/login/manager/createfb"} className="wordings">
              <a href="createfb">Create F&B</a>
            </Link>
            <Link to={"/login/manager/report"} className="wordings">
              <a href="viewfb">View F&B</a>
            </Link>
          </div>
        </div>
        <Link to={"/login/manager/report"} className="wordings">
          <a href="report">Generate report</a>
        </Link>
      </div>
    </>
  );
}
