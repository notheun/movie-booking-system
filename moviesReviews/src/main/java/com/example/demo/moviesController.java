package com.example.demo;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

//will handle RESTful website requests and serialise the response to JSON / XML
@RestController
@RequestMapping("/api/v1/movies")
public class moviesController {
    //moviesService class is dependent(it's dependencies) on moviesRepository to function properly
    @Autowired
    //@Autowired wil automatically inject instance of the field when moviesService is created
    private moviesRepository movieRepo;

    //handles the 'GET' requests
    @GetMapping
    public ResponseEntity<List<movies>> getAllMovies()
    {
        //REST api should return proper status code for convenient front end programming
        return new ResponseEntity<List<movies>>(movieRepo.findAll(), HttpStatus.OK);
    }

    //get single movie
    @GetMapping("/{imdbId}")
    public ResponseEntity<Optional<movies>> getSingleMovie(@PathVariable String imdbId){
        return new ResponseEntity<Optional<movies>>(movieRepo.findMovieByImdbId(imdbId), HttpStatus.OK);
    }
}
