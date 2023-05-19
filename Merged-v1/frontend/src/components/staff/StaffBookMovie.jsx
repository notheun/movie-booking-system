import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import MovieService from "../../services/MovieService";

const StaffBookMovie = () => {
  const { imdbId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovie(imdbId);
  }, []);

  const getMovie = (imdbId) => {
    MovieService.getSingleMovie(imdbId)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (!movie) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <h2>Movie Details</h2>
      <div>
        <img src={movie.poster} alt={movie.title} />
        <h3>Title: {movie.title}</h3>
        <p>IMDb ID: {movie.imdbId}</p>
        <p>Start Time: {movie.startTime}</p>
        <p>Rating: {movie.avgRating}</p>
        {/* Display other movie details here */}
      </div>
    </div>
  );
};

export default StaffBookMovie;
