package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/reviews")
public class reviewsController {

    @Autowired
    private reviewsRepository reviewRepo;
    @Autowired
    private MongoTemplate mongoTemp;

    public reviews addReview(String reviewBody, String imdbId)
    {
        //uses reviewRepo to add to database
        //.insert() also returns the data type you put in it
        reviews review = reviewRepo.insert(new reviews(reviewBody));

        mongoTemp.update(movies.class)
                .matching(Criteria.where("imdbId").is(imdbId))
                .apply(new Update().push("reviewIds").value(review))
                .first();

        return review;
    }

    @PostMapping
    //request body should have string reviewBody and string imdb
    public ResponseEntity<reviews> createReview(@RequestBody Map<String, String> payload)
    {
        return new ResponseEntity<reviews>(addReview(payload.get("reviewBody"), payload.get("imdbId")), HttpStatus.OK);
    }
}

