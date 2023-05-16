package com.example.demo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "reviews")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RateReview {
    @Id
    private ObjectId id;
    private String body;
    private double rating;  //0 to 5 stars

    public RateReview(String body, double rating) {
        this.body = body;
        this.rating = rating;
    }
}
