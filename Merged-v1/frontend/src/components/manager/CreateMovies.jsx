import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import ManagerNavbar from "./ManagerNavbar";
import SignedOutNavbar from "../navbar/SignedOutNavbar";
import MovieService from "../../services/MovieService";
import CinemaRoomService from "../../services/CinemaRoomService";
import UploadImage from "../image/UploadImage";

import "./css/createmovie.css";

const CreateMovies = () => {
    const navigate = useNavigate();

    const [movie, setMovie] = useState({
        id: null,
        imdbId: "",
        title: "",
        poster: null,
        reviewIds: [],
        ageRestriction: "",
        duration: "",
        startTime: "",
        room: "",
    })

    const [image, setImage] = useState(null);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;

        setMovie((prev) => {
            return { 
                ...prev, 
                [name]: value 
            };
        });
    };

    const handleImageUpload = (imageName) => {
        setImage(imageName);
    }

    const isEmpty = () => {
        if (movie.imdbId === ""||
            movie.title === "" ||
            movie.ageRestriction === "" ||
            movie.duration === "" ||
            movie.startTime === "" ||
            movie.room === "")
            return true;
        else return false;
    }; 

    const saveMovie = () => {
        CinemaRoomService.findCinemaRoomByRoomNumber(movie.room)
            .then((res) => {
                const roomData = res.data;
                // console.log(roomData);

                if (!image) {
                    alert("Please upload an image");
                    return;
                }
            
                if (isEmpty()) {
                    alert("Please fill in all the details");
                    return;
                }

                const imageURL = "http://localhost:8080/api/image/files/" + image;

                const movieDetails = {
                    imdbId: movie.imdbId,
                    title: movie.title,
                    poster: imageURL,
                    reviewIds: [],
                    ageRestriction: movie.ageRestriction,
                    duration: movie.duration,
                    startTime: movie.startTime,
                    room: roomData,
                };

                MovieService.createMovie(movieDetails)
                    .then((res) => {
                        console.log(res.data);
                        alert("Movie created successfully");
                        navigate("/login/manager");
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            })
            .catch((e) => {
                alert("Room does not exist");
            })
    };
    
    return (
        <>
            <SignedOutNavbar />
            <ManagerNavbar />
            <div className="topic">
                <h1>Create a new Movie</h1>
            </div>
            <UploadImage onImageUpload={handleImageUpload} />

            <div className="movieBox">
                <div className="movieForm">
                <input
                    required
                    placeholder="IMDb ID"
                    autoComplete="false"
                    type="text"
                    name="imdbId"
                    onChange={handleChangeInput}
                />
                <input
                    required
                    placeholder="Movie Title"
                    autoComplete="false"
                    type="text"
                    name="title"
                    onChange={handleChangeInput}
                />
                <select
                    name="ageRestriction"
                    onChange={handleChangeInput}
                    value={movie.ageRestriction}
                >
                    <option value="">Age Restriction</option>
                    <option value="g">G</option>
                    <option value="pg">PG</option>
                    <option value="pg13">PG13</option>
                    <option value="nc16">NC16</option>
                    <option value="m18">M18</option>
                    <option value="r21">R21</option>
                </select>
                <input
                    required
                    placeholder="Duration"
                    onChange={handleChangeInput}
                    autoComplete="false"
                    type="text"
                    name="duration"
                />
                <input
                    required
                    placeholder="Start Time"
                    onChange={handleChangeInput}
                    autoComplete="false"
                    type="text"
                    name="startTime"
                />
                <input
                    required
                    placeholder="Theatre Number"
                    onChange={handleChangeInput}
                    autoComplete="false"
                    type="number"
                    name="room"
                />
                    <button className="mainBtns" onClick={saveMovie}>
                        Create
                    </button>
                </div>
                <div className="authBottomBox">
                <Link to="/login/manager">
                    <span span className="authBottomText">
                        Return to Main Page
                    </span>
                </Link>
                </div>
            </div>
        </>
    );
}

export default CreateMovies;
