/*

import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import MovieService from "../../services/MovieService";
import CinemaRoomService from "../../services/CinemaRoomService";

const CustomerBookMovies = () => {
    const { imdbId } = useParams();
    const [movie, setMovie] = useState(null);
    const [room, setRoom] = useState(null);

    useEffect(() => {
        getMovie(imdbId);
    }, []);

    // gets movie according to imdbId
    const getMovie = (imdbId) => {
        MovieService.getSingleMovie(imdbId)
            .then((res) => {
                setMovie(res.data);
                getRoom(res.data.room);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    // get room by Movie.room (ObjectId)
    const getRoom = (id) => {
        CinemaRoomService.getRoomByObjectId(id)
            .then((res) => {
                setRoom(res.data);
                console.log(room);
            })
            .catch((e) => {
                console.log(e);
            })
    }



    if (!movie) {
        return (
            <div>Loading ...</div>
        );
    };

    return (
        <div>
            <h2>Movie Details</h2>
            <div>
                <img src={movie.poster} alt={movie.title} />
                <h3>Title: {movie.title}</h3>
                <p>IMDb ID: {movie.imdbId}</p>
                <p>Start Time: {movie.startTime}</p>
                <p>Rating: {movie.avgRating}</p>
                <p>Room</p>
                {room && (
                    <div>
                    <h3>Cinema Room: {room.roomNumber}</h3>
                    <p>Rows: {room.numRows}</p>
                    <p>Columns: {room.numCols}</p>
                    </div>
                )}
            </div>

            <br></br>
            <br></br>

            <div>
                <h3>Reviews</h3>
            </div>
        </div>
    )
}

export default CustomerBookMovies;

*/
