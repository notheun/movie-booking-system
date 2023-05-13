import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import UserService from "../../services/UserService";

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

