package com.example.demo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//auto generates getters setters
@Data
@NoArgsConstructor
@AllArgsConstructor

//name of collection
@Document(collection = "cinemaRoom")
public class CinemaRoom {
    @Id
    private ObjectId id;    //auto generated in MongoDB
    private String roomNumber;
    private int row;
    private int column;

    public CinemaRoom(String roomNumber, int row, int column)
    {
        this.roomNumber = roomNumber;
        this.row = row;
        this.column = column;
    }
}
