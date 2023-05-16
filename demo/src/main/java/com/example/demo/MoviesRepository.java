package com.example.demo;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

//extends a data repository interface
//the 1st param is the type of data, the 2nd param is the type of pri key of 1st param
@Repository
public interface MoviesRepository extends MongoRepository<Movies, ObjectId> {
    Optional<Movies> findMovieByImdbId(String imdbId);
}