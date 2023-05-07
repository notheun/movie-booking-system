import React, { useState } from "react";
import { Link } from "react-router-dom";

import UserService from "../../services/UserService";
import "./user.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from '@mui/material/MenuItem';

export default function CreateUser() {
    const [id, setId] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("abc123"); 
    const [role, setRole] = useState("staff");
    const [status, setStatus] = useState(true);
    const [isCreated, setIsCreated] = useState(false);

    // handle changes
    const onUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const onRoleChange = (e) => {
        setRole(e.target.value);
    }

    const saveUser = () => {
        var data = {
            username: username,
            email: email,
            password: password,
            role: role
        }

        UserService.createUser(data)
            .then(res => {
                setId(res.data.id);
                setUsername(res.data.username);
                setEmail(res.data.email);
                setPassword(res.data.password);
                setRole(res.data.role);
                setStatus(res.data.status);

                setIsCreated(true);
            })
            .catch(e => {
                console.log(e);
            });
    }

    const newUser = () => {
        setId(null);
        setUsername("");
        setEmail("");
        setPassword("abc123");
        setRole("staff");
        setStatus(true);

        setIsCreated(false);
    }

    const allRoles = [
        { value: "manager", label: "Manager" },
        { value: "staff", label: "Staff"},
    ];

    return (
        <div>
            {isCreated ? (
                <div>
                    <h3>User created successfully</h3>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={newUser}
                    >
                        Create Another
                    </Button>     
                </div>
            ) : (
                <div>
                    <div>
                        <TextField
                                id="outlined"
                                label="Username"
                                autoComplete="off"
                                value={username}
                                onChange={onUsernameChange}
                        >
                        </TextField>
                        <TextField
                            id="outlined"
                            label="Email"
                            autoComplete="off"
                            value={email}
                            onChange={onEmailChange}
                        >
                        </TextField>
                        <TextField
                            select
                            id="outlined-select"
                            label="Role"
                            value={role}
                            onChange={onRoleChange}
                        >
                            {allRoles.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            color="success"
                            onClick={saveUser}
                        >
                            Create
                        </Button>
                        <Link to={"/users"}>
                            <Button
                                variant="contained"
                                color="primary"
                            >
                                Return
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}