package cinemabookingsystem.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import cinemabookingsystem.model.Rewards;

@Repository
public interface RewardsRepository extends MongoRepository<Rewards, String> {
    Optional<Rewards> findRewardsById(String id);
}