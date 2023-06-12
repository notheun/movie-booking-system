package com.example.demo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//same as frontend userDetails
@Data
@NoArgsConstructor
@AllArgsConstructor

public class RegisterRequest {
    //same as Users.java without MongoDB id , age
    private String username;
    private String password;
    private String email;
    private String role;    //admin, manager, staff, customer
    @JsonProperty("isActive")   //because of serialization issue
    private boolean isActive;
    private int birthYear;
    private int birthMonth;
    private int birthDay;
    private int loyaltyPoints;
    private String seatPref;
}
