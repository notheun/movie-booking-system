package cinemabookingsystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import cinemabookingsystem.model.Movies;
import cinemabookingsystem.model.RateReview;
import cinemabookingsystem.repository.RateReviewRepository;

@RestController
@RequestMapping("/api/v1/reviews")
public class RateReviewController {

    @Autowired
    private RateReviewRepository rateReviewRepo;
  
    @Autowired
    private MongoTemplate mongoTemp;

    public RateReview addRateReview(String reviewBody, double score, String imdbId)
    {
        //.insert() also returns the data type you put in it
        RateReview rateReview = rateReviewRepo.insert(new RateReview(reviewBody, score));

        mongoTemp.update(Movies.class)
                .matching(Criteria.where("imdbId").is(imdbId))
                .apply(new Update().push("rateReviewIds").value(rateReview))
                .first();

        return rateReview;
    }

    @PostMapping
    public ResponseEntity<RateReview> createRateReview(@RequestBody Map<String, Object> payload) {
        String reviewBody = (String) payload.get("reviewBody");
        double score = (double) payload.get("score");
        String imdbId = (String) payload.get("imdbId");

        RateReview rateReview = addRateReview(reviewBody, score, imdbId);
        return new ResponseEntity<>(rateReview, HttpStatus.OK);
    }
}

