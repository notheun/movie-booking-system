package com.example.demo;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//will handle RESTful website requests and serialise the response to JSON / XML
@RestController
@RequestMapping("/login") // /api
public class MoviesController {
    //moviesService class is dependent(it's dependencies) on moviesRepository to function properly
    @Autowired
    //@Autowired wil automatically inject instance of the field when moviesService is created
    private MoviesRepository movieRepo;

    //rateReview must be stored as objectId for it to work
    public void calculateAvgRating(Movies movie)
    {
        //1. need to account for .size() == 0, will return  NaN. Eg. no ratings
        //2. need to account for invalid or no ratings but got reviews

        if (movie.getRateReviewIds() == null || movie.getRateReviewIds().isEmpty()) {
            System.out.println(movie.getTitle() + " has no ratings");
            movie.setAvgRating(0.0);
            return; // Return early when there are no ratings available
        }

        double sum = 0.0;
        int count = 0;
        for (RateReview rateReview : movie.getRateReviewIds()) {
            Double rating = rateReview.getRating();
            if (rating != null) {
                sum += rating;
                count++;
            }
        }

        if (count > 0) {
            double avg = sum / count;
            movie.setAvgRating(avg);
        } else {
            movie.setAvgRating(0.0); // Set a default value if no valid ratings are found
        }
    }

    //handles the 'GET' requests
    @GetMapping({"/manager", "/staff", "/customer"})
    public ResponseEntity<List<Movies>> getAllMovies()
    {
        //find all movies
        List<Movies> movies = movieRepo.findAll();

        // Calculate the average rating for each movie - to be most updated
        for (Movies movie : movies) {
            System.out.println(movie.getRateReviewIds());
            calculateAvgRating(movie);
            //saves to mongo the updated avg rating
            movieRepo.save(movie);
        }

        //REST api should return proper status code for convenient front end programming
        return new ResponseEntity<List<Movies>>(movies, HttpStatus.OK);
    }

    //get single movie
    @GetMapping("/{imdbId}")
    public ResponseEntity<Optional<Movies>> getSingleMovie(@PathVariable String imdbId){
        return new ResponseEntity<Optional<Movies>>(movieRepo.findMovieByImdbId(imdbId), HttpStatus.OK);
    }

    @PostMapping("/manager/createMovies")
    public ResponseEntity<?> createMovie(@RequestBody MovieDetails movieDetails)
    {
        ObjectId roomId = new ObjectId(String.valueOf(movieDetails.getRoom()));

        Movies newMovie = new Movies(movieDetails.getImdbId(), movieDetails.getTitle(), movieDetails.getPoster(),
                                        movieDetails.getAgeRestriction(), movieDetails.getDuration(),
                                        movieDetails.getStartTime(), roomId);

        try{
            movieRepo.save(newMovie);
        }
        catch (Exception err){
            // internalServerError - HTTP 500 status
            return ResponseEntity.internalServerError().body("Error: Unable to create movie");
        }
        return ResponseEntity.ok("Successful creation for movie: " + movieDetails.getTitle());
    }

    @DeleteMapping("/manager/deleteMovies/{imdbId}")
    public ResponseEntity<String> deleteFoodDrinks(@PathVariable String imdbId) {
        Optional<Movies> optionalMovie = movieRepo.findMovieByImdbId(imdbId);

        if (optionalMovie.isPresent()) {
            Movies mov = optionalMovie.get();
            movieRepo.delete(mov);
            return ResponseEntity.ok("Movie deleted successfully");

        } else {
            return ResponseEntity.internalServerError().body("Movie not found");
        }
    }

}
