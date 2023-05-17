import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SignedOutNavbar from "../navbar/SignedOutNavbar";
import UserService from "../../services/UserService";
import "../user/user.css";
import DropNavbar from "./DropNavbar";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

export default function ListMovie() {
  //need to change to movie search function (currently search user)
  const [customers, setCustomers] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchMovie, setSearchMovie] = useState("");

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

  const setCustDisplay = (customer, index) => {
    setCurrentCustomer(customer);
    setCurrentIndex(index);
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
      <DropNavbar />
      {/* Movie search function, need to change according to backend */}
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
