import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import UserService from "../../services/UserService";
import "../user/user.css";

import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

export default function ListCustomers() {
  const [customers, setCustomers] = useState([]);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchUsername, setSearchUsername] = useState("");

  useEffect(() => {
    getCustomers();
  }, []);

  const onSearchChange = (e) => {
    setSearchUsername(e.target.value);
    searchByUsername(e.target.value);
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

  const searchByUsername = (username) => {
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
      <div
        className="userpage-cont"
        onClick={() => {
          setCurrentCustomer(null);
          setCurrentIndex(-1);
        }}
      >
        <div className="userdisplay-cont">
          <div className="userfieldset-cont">
            <h1>Customer Details</h1>
            <div className="userdetails-cont">
              <div className="userdisplay-details">
                <label>Username:</label>{" "}
                {currentCustomer ? currentCustomer.username : ""}
              </div>
              <div className="userdisplay-details">
                <label>Loyalty Points:</label>{" "}
                {currentCustomer ? currentCustomer.loyaltyPoints : ""}
              </div>
              <br></br>
            </div>
          </div>
        </div>
      </div>

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
            label="Search by Username"
            autoComplete="off"
            value={searchUsername}
            onChange={onSearchChange}
          />
          <IconButton
            type="button"
            color="warning"
            sx={{ p: "4px" }}
            aria-label="Search by Username"
          >
            <SearchIcon />
          </IconButton>
        </Box>
      </div>
      <div className="userlist-cont">
        <h1>All Customers</h1>
        <table>
          <tr>
            <th>Username</th>
            <th>Loyalty Points</th>
          </tr>
          {customers &&
            customers.map((customer, index) => (
              <tr
                key={index}
                className={index === currentIndex ? "active" : ""}
                onClick={() => setCustDisplay(customer, index)}
              >
                <td>{customer.username}</td>
              </tr>
            ))}
        </table>
      </div>
    </div>
  );
}
