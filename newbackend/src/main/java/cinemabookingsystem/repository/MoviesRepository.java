package cinemabookingsystem.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import cinemabookingsystem.model.Movies;
import java.util.List;


//extends a data repository interface
//the 1st param is the type of data, the 2nd param is the type of pri key of 1st param
@Repository
public interface MoviesRepository extends MongoRepository<Movies, String> {
    Optional<Movies> findMovieByImdbId(String imdbId);
    Optional<Movies> findByTitleContainingIgnoreCase(String title);
    List<Movies> findByImdbId(String imdbId);
}