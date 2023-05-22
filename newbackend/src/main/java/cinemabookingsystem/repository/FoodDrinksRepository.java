package cinemabookingsystem.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import cinemabookingsystem.model.FoodDrinks;

@Repository
public interface FoodDrinksRepository extends MongoRepository<FoodDrinks, String> {
    Optional<FoodDrinks> findFoodDrinksByItemNumber(String itemNumber);
    Optional<FoodDrinks> findFoodDrinksById(String id);
}