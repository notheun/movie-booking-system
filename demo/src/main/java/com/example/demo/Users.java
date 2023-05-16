package com.example.demo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.Period;

//auto generates getters setters
@Data
@NoArgsConstructor
@AllArgsConstructor

//name of collection
@Document(collection = "users")
public class Users {
    @Id
    private ObjectId id;    //auto generated in MongoDB
    private String username;
    private String password;
    private String email;
    private String role;    //admin, manager, staff, customer
    private boolean isActive;
    private int birthYear;
    private int birthMonth;
    private int birthDay;
    private int age;
    private int loyaltyPoints;
    private String seatPref;

    public Users(String username, String password, String email, String role, boolean isActive, int birthYear, int birthMonth, int birthDay, String seatPref)
    {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.isActive = isActive;
        this.birthYear = birthYear;
        this.birthMonth = birthMonth;
        this.birthDay = birthDay;
        this.age = calculateAge();  //based on year, month, day
        this.loyaltyPoints = 0;     //all users start with 0 loyalty points
        this.seatPref = seatPref;   //"front", "middle", "back". "null" for non customer
    }

    public int calculateAge(){
        LocalDate birthDate = LocalDate.of(birthYear, birthMonth, birthDay);
        LocalDate currentDate = LocalDate.now();
        Period period = Period.between(birthDate, currentDate);

        return period.getYears();
    }
}
