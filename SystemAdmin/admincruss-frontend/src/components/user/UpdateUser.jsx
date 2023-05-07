import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import UserService from "../../services/UserService";
import { UseRouter } from "../../common/UseRouter";
import "./user.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function UpdateUser(props) {
    const [currentUser, setCurrentUser] = useState({
        id: null,
        username: "",
        email: "",
        role: "",
        isActive: true
    });

    const [prevData, setPrevData] = useState({
        id: null,
        username: "",
        email: "",
        role: "",
        isActive: true
    });

    const [notif, setNotif] = useState("");

    const getUser = (id) => {
        UserService.getUserById(id)
            .then(res => {
                setCurrentUser(res.data);
                setPrevData(res.data);
                console.log(res.data);
            })
            .catch(e => {
                console.log("No data");
            });
    }

    // handle changes
    const onUsernameChange = (e) => {
        setCurrentUser((prev) => ({
                ...prev,
                username: e.target.value 
        }));
    }

    const onEmailChange = (e) => {
        setCurrentUser((prev) => ({
                ...prev,
                email: e.target.value
        }));
    }

    const onRoleChange = (e) => {
        setCurrentUser((prev) => ({
                ...prev,
                role: e.target.value
        }));
    }

    const updateStatus = (status) => {
        var userDetails = {
            id: currentUser.id,
            username: currentUser.username,
            email: currentUser.email,
            role: currentUser.role,
            isActive: status
        }

        UserService.updateUser(currentUser.id, userDetails)
            .then (res => {
                setCurrentUser((prev) => ({
                        ...prev,
                        isActive: status

                }));
            })
            .catch(e => {
                console.log(e);
            });
    }

    const updateCurrentUser = () => {
        UserService.updateUser(currentUser.id, currentUser)
            .then (res => {
                setNotif("Update successful");
            })
            .catch(e => {
                console.log("Update failed");
            });
    }

    useEffect(() => {
        getUser(props.router.params.id);
    }, [props.router.params.id]);

    return (
        <div>  
            <div>
                <h4>User Profile</h4>
                <form>
                    <div>
                        <TextField
                            id="username"
                            label="Username"
                            autoComplete="off"
                            InputLabelProps={{ shrink: true }}
                            helperText={prevData.username}
                            value={currentUser.username}
                            onChange={onUsernameChange}
                        >
                        </TextField>
                        <TextField
                            id="email"
                            label="Email"
                            autoComplete="off"
                            InputLabelProps={{ shrink: true }}
                            helperText={prevData.email}
                            value={currentUser.email}
                            onChange={onEmailChange}
                        >
                        </TextField>
                        <TextField
                            disabled
                            autoComplete="off"
                            InputLabelProps={{ shrink: true }}
                            id="outlined-disabled"
                            label="Role"
                            value={currentUser.role}
                        >
                        </TextField>
                    </div>
                    <div>
                        <label>Status:</label>
                        {" "}
                        {currentUser.isActive ? "Active" : "Suspended"}
                    </div>
                </form>

                {currentUser.isActive ? (
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => updateStatus(false)}
                    >
                        Suspend
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => updateStatus(true)}
                    >
                        Activate
                    </Button>
                )}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={updateCurrentUser}
                >
                    Update
                </Button>
                <h4>{notif}</h4>
                <Link to={"/users"}>
                    <Button
                        variant="outlined"
                        color="primary"
                    >
                        Return
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default UseRouter(UpdateUser);