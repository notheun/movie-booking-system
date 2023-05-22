import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import SignedOutNavbar from "../navbar/SignedOutNavbar";
import CustomerNavbar from "./CustomerNavbar";

import MovieService from "../../services/MovieService";

import "../admin/user.css";
import "./css/movie.css";

import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

const CustomerMovies = () => {
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
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const searchByMovie = (imdbId) => {
    // if param exist
    if (imdbId) {
      MovieService.findByImdbId(imdbId).then((res) => {
        setMovies(res.data ? [res.data] : []);
      });
    } else {
      getMovies(); // get all movies if no param
    }
  };

  // set correct customer navigation route
  const proceedBooking = (imdbId) => {
    //console.log("id" + imdbId);
    const customerId = localStorage.getItem("customerId");
    navigate(`/${customerId}/${imdbId}`);
  };

  return (
    <div>
      <SignedOutNavbar />
      <CustomerNavbar />
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
      <div className="cardContainer">
        <ul className="cardGrid">
          {movies &&
            movies.map((movie, index) => (
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
                <button
                  className="mainBtns"
                  onClick={() => proceedBooking(movie.imdbId)}
                >
                  Book Now!
                </button>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerMovies;
