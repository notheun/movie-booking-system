import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ManagerNavbar from "./ManagerNavbar";
import SignedOutNavbar from "../navbar/SignedOutNavbar";

import MovieService from "../../services/MovieService";

import "./css/managemovie.css";

import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ImageService from "../../services/ImageService";

const ManageMovie = () => {
  const [searchMovie, setSearchMovie] = useState("");
  const [movies, setMovies] = useState([]);

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

  const searchByMovie = (imdbId) => {
    // if param exist
    if (imdbId) {
      MovieService.findByImdbId(imdbId)
        .then((res) => {
          console.log(res);
          setMovies(res.data ? [res.data] : []) // render empty array if not found
        });
    } else {
      getMovies();  // get all movies if no param
    }
  };

  const deleteMovie = (imdbId) => {
    MovieService.deleteMovie(imdbId)
      .then((res) => {
        alert(`Movie ${imdbId} deleted successfully`);
        getMovies();

        const imageURL = movies.find(movies => movies.imdbId === imdbId).poster;
        if (imageURL) {
          const filename = imageURL.split("/").pop();
          ImageService.delete(filename)
            .then(() => {
              console.log("Image deleted successfully");
              getMovies();
            })
            .catch((e) => {
              console.log("Failed to delete image: ", e);
            })
        } else {
          console.log("No image associated with the movie");
          getMovies();
        }
      })
      .catch((e) => {
        console.log(`Failed to delete movie: ${imdbId}`);
      })
  }

  return (
    <div>
      <SignedOutNavbar />
      <ManagerNavbar />
      <div className="topic">
        <h1>Edit Movie</h1>
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
              <button onClick={() => deleteMovie(movie.imdbId)}>Delete</button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ManageMovie;