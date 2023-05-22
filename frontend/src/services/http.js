import axios from "axios";

const token = localStorage.getItem("token"); // get the JWT token from local storage

export default axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`, // set the authorization header with the token
    }
})