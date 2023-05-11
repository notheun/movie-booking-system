import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import UserService from "../../services/UserService";
import { UseRouter } from "../../common/UseRouter";
import "./UpdateUser.css";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

function UpdateUser(props) {
  const [currentUser, setCurrentUser] = useState({
    id: null,
    username: "",
    email: "",
    password: "",
    role: "",
    isActive: true,
  });

  const [prevData, setPrevData] = useState({
    id: null,
    username: "",
    email: "",
    password: "",
    role: "",
    isActive: true,
  });

  const [notif, setNotif] = useState("");

  const getUser = (id) => {
    UserService.getUserById(id)
      .then((res) => {
        setCurrentUser(res.data);
        setPrevData(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.log("No data");
      });
  };

  // handle changes
  const onUsernameChange = (e) => {
    setCurrentUser((prev) => ({
      ...prev,
      username: e.target.value,
    }));
  };

  const onEmailChange = (e) => {
    setCurrentUser((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const onRoleChange = (e) => {
    setCurrentUser((prev) => ({
      ...prev,
      role: e.target.value,
    }));
  };

  const updateStatus = (status) => {
    var userDetails = {
      id: currentUser.id,
      username: currentUser.username,
      email: currentUser.email,
      password: currentUser.password,
      role: currentUser.role,
      isActive: status,
    };

    UserService.updateUser(currentUser.id, userDetails)
      .then((res) => {
        setCurrentUser((prev) => ({
          ...prev,
          isActive: status,
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateCurrentUser = () => {
    UserService.updateUser(currentUser.id, currentUser)
      .then((res) => {
        setNotif("Update successful");
      })
      .catch((e) => {
        console.log("Update failed");
      });
  };

  useEffect(() => {
    getUser(props.router.params.id);
  }, [props.router.params.id]);

  const allRoles = [
    { value: "manager", label: "Manager" },
    { value: "staff", label: "Staff" },
  ];

  return (
    <div>
      <div className="userlist-cont">
        <h1>User Profile</h1>
        <form>
          <div>
            <TextField
              className="editTextField"
              id="username"
              label="Username"
              autoComplete="off"
              color="warning"
              variant="standard"
              InputLabelProps={{ shrink: true }}
              helperText={prevData.username}
              value={currentUser.username}
              onChange={onUsernameChange}
            ></TextField>
            <TextField
              className="editTextField"
              id="email"
              label="Email"
              autoComplete="off"
              color="warning"
              variant="standard"
              InputLabelProps={{ shrink: true }}
              helperText={prevData.email}
              value={currentUser.email}
              onChange={onEmailChange}
            ></TextField>
            <TextField
              className="editTextField"
              select
              id="outlined-select"
              label="Role"
              color="warning"
              variant="standard"
              value={currentUser.role}
              onChange={onRoleChange}
            >
              {allRoles.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="statusOfUser">
            <label>Status:</label>{" "}
            {currentUser.isActive ? "Active" : "Suspended"}
          </div>
        </form>

        <div className="buttonBottomUserProfile">
          {currentUser.isActive ? (
            <button
              className="mainBtns"
              variant="contained"
              color="error"
              onClick={() => updateStatus(false)}
            >
              Suspend
            </button>
          ) : (
            <button
              className="mainBtns"
              variant="contained"
              color="success"
              onClick={() => updateStatus(true)}
            >
              Activate
            </button>
          )}
          <button
            className="mainBtns"
            variant="contained"
            color="primary"
            onClick={updateCurrentUser}
          >
            Update
          </button>
        </div>
        <h4>{notif}</h4>
        <Link to={"/login/admin"}>
          {/* <button className="mainBtns" variant="outlined" color="primary">
            Return
          </button> */}
          <span span className="authBottomText">
            Return to Main Page
          </span>
        </Link>
      </div>
    </div>
  );
}

export default UseRouter(UpdateUser);
