import React, { useState, useEffect } from "react";

import ManagerNavbar from "./ManagerNavbar";
import SignedOutNavbar from "../navbar/SignedOutNavbar";
import CinemaRoomService from "../../services/CinemaRoomService";
import "./css/createmovie.css";

const ManageFoodDrinks = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRoom();
  }, []);

  const getRoom = () => {
    CinemaRoomService.viewRoom()
      .then((res) => {
        setRooms(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteRoom = (roomNumber) => {
    CinemaRoomService.deleteCinemaRoom(roomNumber)
      .then(() => {
        alert(`Cinema room ${roomNumber} deleted successfully`);
        getRoom();
      })
      .catch((error) => {
        alert("Failed to delete cinema room:", error);
      });
  };

  return (
    <div>
      <SignedOutNavbar />
      <ManagerNavbar />
      <div className="topic">
        <h1>Edit Movie Theatre</h1>
      </div>
      <div className="movieBox">
        {rooms.map((room, index) => (
          <div key={index}>
            <h3>Cinema Room: {room.roomNumber}</h3>
            <p>Rows: {room.row}</p>
            <p>Columns: {room.column}</p>
            <button
              className="mainBtns"
              onClick={() => deleteRoom(room.roomNumber)}
            >
              Delete Theatre
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageFoodDrinks;
