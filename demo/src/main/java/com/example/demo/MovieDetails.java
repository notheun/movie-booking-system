package com.example.demo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieDetails {
    private String imdbId;
    private String title;
    private String poster;              //url for the picture
    private String ageRestriction;     //0 for no age restriction, 16, 18, 21
    private String duration;
    private String startTime;
    private ObjectId room;
}
