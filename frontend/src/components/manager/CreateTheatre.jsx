// CreateTheatre.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ManagerNavbar from "./ManagerNavbar";
import SignedOutNavbar from "../navbar/SignedOutNavbar";

import SeatSelector from "./SeatSelector";
import SeatManager from "./SeatManager";

import "./css/createtheatre.css";

import CinemaRoomService from "../../services/CinemaRoomService";

const CreateTheatre = () => {
  const navigate = useNavigate();

  const [room, setRoom] = useState({
    roomNumber: "",
    numRows: "10",
    numCols: "10",
  });

  function handleSeatManagerChange(newRoom) {
    setRoom((prevRoom) => ({
      ...prevRoom,
      roomNumber: newRoom.roomNumber,
      numRows: parseInt(newRoom.numRows),
      numCols: parseInt(newRoom.numCols),
    }));
  }

  const isEmpty = () => {
    if (room.roomNumber === "") return true;
    else return false;
  };

  const saveTheatre = () => {
    if (isEmpty()) {
      alert("Please enter a room number!");
      return;
    }

    const roomDetails = {
      roomNumber: room.roomNumber,
      numRows: parseInt(room.numRows),
      numCols: parseInt(room.numCols),
    };
    CinemaRoomService.createRoom(roomDetails)
      .then((res) => {
        console.log(res.data);
        alert("Room created successfully");
        navigate("/login/manager");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <SignedOutNavbar />
      <ManagerNavbar />
      <SeatManager onChange={handleSeatManagerChange} />
      <SeatSelector numRows={room.numRows} numCols={room.numCols} />
      <div className="overall">
        <button className="mainBtns" onClick={saveTheatre}>
          Create Theatre
        </button>
      </div>
    </div>
  );
};

export default CreateTheatre;
