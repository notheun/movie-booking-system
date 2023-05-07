import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import UserService from "../../services/UserService";
import "./user.css";

import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

export default function ListUser() {
const [users, setUsers] = useState([]);
const [currentUser, setCurrentUser] = useState(null);
const [currentIndex, setCurrentIndex] = useState(-1);
const [searchUsername, setSearchUsername] = useState("");

useEffect(() => {
    getUsers();
}, []);

const onSearchChange = (e) => {
    setSearchUsername(e.target.value);
    searchByUsername(e.target.value);
};

const getUsers = () => {
    UserService.getAllUsers()
    .then((res) => {
        setUsers(res.data);
        console.log(res.data);
    })
    .catch((e) => {
        console.log(e);
    });
};

const setUserDisplay = (user, index) => {
    setCurrentUser(user);
    setCurrentIndex(index);
};

const searchByUsername = (username) => {
    UserService.findByUsernameContaining(username)
    .then((res) => {
        setUsers(res.data);
    })
    .catch((e) => {
        console.log("User not found");
    });
};

return (
    <div>
        <div 
            className="userpage-cont"
            onClick={() => { 
                setCurrentUser(null); 
                setCurrentIndex(-1); 
            }}
        >
            <div className="userdisplay-cont">  
                <div className="userfieldset-cont">
                    <h1>User Details</h1>
                    <div className="userdetails-cont">
                        <div className="userdisplay-details">
                            <label>Username:</label>
                            {" "}
                            {currentUser ? currentUser.username : ""}
                        </div>
                        <div className="userdisplay-details">
                            <label>Email:</label>
                            {" "}
                            {currentUser ? currentUser.email : ""}
                        </div>
                        <div className="userdisplay-details">
                            <label>Role:</label>
                            {" "}
                            {currentUser ? currentUser.role : ""}
                        </div>
                        <div className="userdisplay-details">
                            <label>Status:</label>
                            {" "}
                            {currentUser ? (currentUser.isActive ? "Active" : "Suspended") : ""}
                        </div>
                        <br></br>
                        {currentUser ? (
                            <Link to={"/users/" + currentUser.id}>
                                <Button variant="contained" color="primary">
                                    Update
                                </Button>
                            </Link>
                        ) : ("")} 
                    </div>                          
                </div >
            </div>            
        </div>
        <div>
            <Link to={"/createuser"}>
            <Button variant="contained" color="primary">
                Create
            </Button>
            </Link>
        </div>
        <div className="searchBar">
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextField
                id="input-with-sx"
                sx={{
                  }}
                  InputLabelProps={{
                    style: { color: 'gray'},
                    sx: {
                      color: 'gray'
                    },
                  }}
                  InputProps={{
                    sx: {
                        '&:focus-within ' : {
                        borderBottom: '1px solid gray!important',
                        },
                        '&:hover': {
                        borderBottom: '1px solid white!important',
                        },
                    },
                  }}
                  inputProps={{
                    sx: {
                      color: 'gray',
                      paddingLeft: '14px',
                      fontSize: '18px',
                    },
                  }}
                label="Search by Username"
                variant="standard"
                autoComplete="off"
                value={searchUsername}
                onChange={onSearchChange}          
            />
            <IconButton
                type="button"
                sx={{ p: "4px" }}
                aria-label="Search by Username"
            >
                <SearchIcon />
            </IconButton>
            </Box>
        </div>
        <div className="userlist-cont">
            <h1>All Users</h1>
            <table>
                <tr>
                    <th>Username</th>
                    <th>Status</th>
                </tr>
                {users && users.map((user, index) => (
                    <tr
                        key={index}
                        className={index === currentIndex ? "active" : ""}
                        onClick={() => setUserDisplay(user, index)}
                    >
                        <td>{user.username}</td>
                        <td>{user.role}</td>
                    </tr>
                ))}
            </table>
        </div>
    </div>
    );
}
