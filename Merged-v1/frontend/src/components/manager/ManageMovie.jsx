import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ManagerNavbar from "./ManagerNavbar";
import SignedOutNavbar from "../navbar/SignedOutNavbar";

import UserService from "../../services/UserService";

import "./css/managemovie.css";

import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";

export default function ManageMovie() {
  const [searchMovie, setSearchMovie] = useState("");
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    getCustomers();
  }, []);

  const onSearchChange = (e) => {
    setSearchMovie(e.target.value);
    searchByMovie(e.target.value);
  };
  const getCustomers = () => {
    UserService.getAllCustomers()
      .then((res) => {
        setCustomers(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const searchByMovie = (username) => {
    UserService.findByRoleAndUsernameContainingIgnoreCase("customer", username)
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((e) => {
        console.log("User not found");
      });
  };
  return (
    <div>
      <SignedOutNavbar />
      <ManagerNavbar />
      <div className="topic">
        <h1>Edit Movie</h1>
      </div>
      {/* Movie Search Function(need to change) */}
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
    </div>
  );
}

// import ManagerNavbar from "./ManagerNavbar";
// import SignedOutNavbar from "../navbar/SignedOutNavbar";
// export default function EditMovie() {
//   return (
//     <div>
//       <SignedOutNavbar />
//       <ManagerNavbar />
//     </div>
//   );
// }
