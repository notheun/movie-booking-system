package com.example.demo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//same as frontend cinema room details
@Data
@NoArgsConstructor
@AllArgsConstructor

public class CinemaRoomDetails {
    private String roomNumber;
    private int row;
    private int column;
}
