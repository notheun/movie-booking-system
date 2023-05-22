import React, { useState, useEffect } from 'react';

import ManagerNavbar from "./ManagerNavbar";
import SignedOutNavbar from "../navbar/SignedOutNavbar";

import CinemaRoomService from '../../services/CinemaRoomService';

import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

import "./css/createmovie.css";

const ManageTheatre = () => {
    const [rooms, setRooms] = useState([]);
    const [searchRoom, setSearchRoom] = useState("");

    useEffect(() => {
        getRoom();
    }, []);

    const onSearchChange = (e) => {
        setSearchRoom(e.target.value);
        searchByRoom(e.target.value);
    }

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

    const searchByRoom = (roomNumber) => {
        if (roomNumber) {
            CinemaRoomService.findCinemaRoomByRoomNumber(roomNumber)
                .then((res) => {
                    setRooms(res.data ? [res.data] : [])
                    console.log(rooms);
                })
        } else {
            getRoom();
        }
    }

    return (
        <div>
            <SignedOutNavbar />
            <ManagerNavbar />
            <div className="topic">
                <h1>Edit Movie Theatre</h1>
            </div>
            <div className="searchBar">
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <TextField
            id="input-with-sx"
            variant="filled"
            sx={{}}
            InputLabelProps={{
              style: { color: "gray" },
              sx: {
                color: "gray",
              },
            }}
            InputProps={{
              sx: {
                "&:focus-within ": {
                  borderBottom: "1px solid gray!important",
                },
                "&:hover": {
                  borderBottom: "1px solid white!important",
                },
              },
            }}
            inputProps={{
              sx: {
                color: "gray",
                paddingLeft: "14px",
                fontSize: "18px",
              },
            }}
            label="Search by Room Number"
            autoComplete="off"
            value={searchRoom}
            onChange={onSearchChange}
          />
          <IconButton
            type="button"
            color="warning"
            sx={{ p: "4px" }}
            aria-label="Search by Room Number"
          >
            <SearchIcon />
            </IconButton>
        </Box>
    </div>
            <div className="movieBox">
                {rooms.map((room, index) => (
                    <div key={index}>
                        <h3>Cinema Room: {room.roomNumber}</h3>
                        <p>Rows: {room.numRows}</p>
                        <p>Columns: {room.numCols}</p>
                        <button className="mainBtns" onClick={() => deleteRoom(room.roomNumber)}>
                            Delete Theatre
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageTheatre;
