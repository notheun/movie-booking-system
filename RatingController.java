package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/ratings")
public class RatingController {
    @Autowired
    private RatingService ratingService;

    @PostMapping
    public ResponseEntity<Rating> createRating(@RequestBody Map<String, String> payload) {
        Double ratingStars = Double.parseDouble(payload.get("ratingStars"));
        String imdbId = payload.get("imdbId");

        Rating createdRating = ratingService.createRating(ratingStars, imdbId);
        return new ResponseEntity<>(createdRating, HttpStatus.CREATED);
    }

}
