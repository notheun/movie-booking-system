/*import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import UserService from "../../services/UserService";

/*
export default function ListMovie() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get('/api/movies') // changing ltr
          .then(response => {
            setMovies(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

    const handleDelete = (movieId) => {
        axios.delete(`/api/movies/${movieId}`) // changing ltr
          .then(response => {
            // display existing movies after deletion
            setMovies(movies.filter(movie => movie.id !== movieId));
          })
          .catch(error => {
            console.log(error);
          });
    }

    return (
        <div>
            <Link to={"/login/staff/checkloyaltypoints"}>
                <button>View Loyalty Points</button>
            </Link>
            <Link to={"/login/staff/viewfb"}>
                <button>F&B</button>
            </Link>
            <Link to={"/login/staff/checkticket"}>
                <button>Check Ticket</button>
            </Link>
        </div>
    )
}
*/


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SignedOutNavbar from "../navbar/SignedOutNavbar";
import StaffNavBar from "./StaffNavbar";

import "../admin/user.css";

import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

export default function ListMovie() {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchMovie, setSearchMovie] = useState("");

  const onSearchChange = (e) => {
    setSearchMovie(e.target.value);
  };
  //Function to get the data of movies
  const bookMovie = () => {
    return;
  };

  return (
    <div>
      <SignedOutNavbar />
      <StaffNavBar />
      <div className="topic">
        <h1>Movies</h1>
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
            label="Search by Movie"
            autoComplete="off"
            value={searchMovie}
            onChange={onSearchChange}
          />
          <IconButton
            type="button"
            color="warning"
            sx={{ p: "4px" }}
            aria-label="Search by Movie"
          >
            <SearchIcon />
          </IconButton>
        </Box>
      </div>
      <Link to={"/login/staff/:movieid"}>
        <button className="mainBtns" onClick={bookMovie}>
          Book Now!
        </button>
      </Link>
    </div>
  );
}
