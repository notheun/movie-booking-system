import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SignedOutNavbar from "../navbar/SignedOutNavbar";
import StaffNavBar from "./StaffNavbar";

import MovieService from "../../services/MovieService";

import "../admin/user.css";
import "./css/staffmovie.css";

import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

export default function StaffMovies() {
  const [searchMovie, setSearchMovie] = useState("");
  const [movies, setMovies] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getMovies();
  }, []);

  const onSearchChange = (e) => {
    setSearchMovie(e.target.value);
    searchByMovie(e.target.value);
  };

  const getMovies = () => {
    MovieService.getAllMovies()
      .then((res) => {
        setMovies(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const searchByMovie = (title) => {
    // if param exist
    if (title) {
      MovieService.findByTitleContainingIgnoreCase(title)
        .then((res) => {
          setMovies(res.data ? [res.data] : []) 
        });
    } else {
      getMovies();  // get all movies if no param
    }
  };

  return (
    <div>
      <SignedOutNavbar />
      <StaffNavBar />
      <div className="topic">
        <h1>View Movie</h1>
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
      <div className="cardContainer">
        <ul className="cardGrid">
          {movies.map((movie, index) => (
            <div key={index} className="movieCard">
              <div className="movieImg">
                <img src={movie.poster} alt={movie.title} />
              </div>
              <div className="cardInfo">
                <h3>{movie.title}</h3>
                <ul className="cardList">
                  <li>IMDb ID: {movie.imdbId}</li>
                  <li>Start Time: {movie.startTime}</li>
                  <li>Rating: {movie.avgRating}</li>
                </ul>
              </div>
                <button className="mainBtns" onClick={() => navigate(`/login/staff/${movie.imdbId}`)}>
                  Book Now!
                </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}