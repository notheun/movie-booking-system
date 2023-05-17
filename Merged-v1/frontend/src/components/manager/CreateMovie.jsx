import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ManagerNavbar from "./ManagerNavbar";
import SignedOutNavbar from "../navbar/SignedOutNavbar";
import "./CreateMovie.css";

export default function CreateMovie() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    title: "",
    description: "",
    childticket: "",
    studentticket: "",
    adultticket: "",
    elderlyticket: "",
    agerestriction: "",
    theatrenumber: "",
    starttime: "",
    duration: "",
  });
  const inputRef = useRef();
  const handleOpenFile = () => {
    inputRef.current.click();
  };
  const handleInputFilechange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleChangeInput = (e) => {
    const name = e.target.name; // name here means the name of the input field
    const value = e.target.value; // value of that input field

    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <>
      <SignedOutNavbar />
      <ManagerNavbar />
      <div className="topic">
        <h1>Create a new Movie</h1>
      </div>

      {file && file.type.split("/")[0] === "image" && (
        <img src={URL.createObjectURL(file)} alt="" />
      )}

      <input
        style={{ display: "none" }}
        type="file"
        ref={inputRef}
        onChange={handleInputFilechange}
      />
      <button className="mainBtns" onClick={handleOpenFile}>
        Upload File
      </button>

      <div className="movieBox">
        <div className="movieForm">
          <input
            required
            placeholder="Movie Title"
            autoComplete="false"
            type="text"
            name="title"
            onChange={handleChangeInput}
          />
          <input
            required
            placeholder="Description"
            autoComplete="false"
            type="text"
            name="description"
            onChange={handleChangeInput}
          />
          <input
            required
            placeholder="Ticket Price (child):"
            autoComplete="false"
            type="text"
            name="childticket"
            onChange={handleChangeInput}
          />
          <input
            required
            placeholder="Ticket Price (student):"
            autoComplete="false"
            type="text"
            name="studentticket"
            onChange={handleChangeInput}
          />
          <input
            required
            placeholder="Ticket Price (adult):"
            autoComplete="false"
            type="text"
            name="adultticket"
            onChange={handleChangeInput}
          />
          <input
            required
            placeholder="Ticket Price (elderly):"
            autoComplete="false"
            type="text"
            name="elderlyticket"
            onChange={handleChangeInput}
          />
          <input
            required
            placeholder="Age Restriction:"
            onChange={handleChangeInput}
            autoComplete="false"
            type="text"
            name="agerestriction"
          />

          <input
            required
            placeholder="Theatre Number:"
            onChange={handleChangeInput}
            autoComplete="false"
            type="text"
            name="theatrenumber"
          />
          <input
            required
            placeholder="Start Time:"
            onChange={handleChangeInput}
            autoComplete="false"
            type="text"
            name="starttime"
          />
          <input
            required
            placeholder="Duration:"
            onChange={handleChangeInput}
            autoComplete="false"
            type="text"
            name="duration"
          />

          <button className="mainBtns">Create</button>
        </div>
        <div className="authBottomBox">
          <Link to="/login/manager">
            <span span className="authBottomText">
              Return to Main Page
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
