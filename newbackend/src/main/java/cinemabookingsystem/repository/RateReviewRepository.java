package cinemabookingsystem.repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import cinemabookingsystem.model.RateReview;;

@Repository
public interface RateReviewRepository extends MongoRepository<RateReview, ObjectId> {
}

