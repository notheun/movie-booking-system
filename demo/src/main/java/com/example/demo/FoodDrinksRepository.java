package com.example.demo;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FoodDrinksRepository extends MongoRepository<FoodDrinks, ObjectId> {
    Optional<FoodDrinks> findFoodDrinksByItemNumber(String itemNumber);
}
