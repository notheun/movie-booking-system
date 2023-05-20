import "./home.css";
import { useContext } from "react";
import { userContext } from "../../context/context";
import Navbar from "../navbar/Navbar";
import HomeNavbar from "./HomeNavbar";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MovieService from "../../services/MovieService";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import RatingAndReview from "../customer/RatingAndReview";
const Home = () => {
  const { dispatch } = useContext(userContext);
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
      MovieService.getSingleMovie(imdbId)
        .then((res) => {
          setMovies(res.data ? [res.data] : []); // render empty array if not found
        })
        .catch((e) => {
          console.log("Not found");
        });
    } else {
      getMovies(); // get all movies if no param
    }
  };
  return (
    <>
      <Navbar />
      {/* <div className="home"> */}
      {/* <div className="home_container"> */}
      {/* <div className="home_header"></div> */}
      {/* </div> */}
      {/* </div> */}
      <HomeNavbar />

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
              <Link to={`/login/staff/${movie.id}`}>
                <button className="mainBtns">Book Now!</button>
              </Link>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;
