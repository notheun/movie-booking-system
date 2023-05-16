package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
//@RequestMapping("/api")
@RequestMapping("/login/manager")
public class FoodDrinksController {
    @Autowired
    private FoodDrinksRepository foodDrinksRepo;

    @PostMapping("/createFb")
    private ResponseEntity<?> createRoom(@RequestBody FoodDrinks foodDrinksDetails)
    {
        FoodDrinks newFoodDrinks = new FoodDrinks(foodDrinksDetails.getItemNumber(), foodDrinksDetails.getDescription(),
                                                    foodDrinksDetails.getPrice(), foodDrinksDetails.getPoster());

        try{
            //save user to database
            foodDrinksRepo.save(newFoodDrinks);
        }
        catch (Exception err){
            // internalServerError - HTTP 500 status
            return ResponseEntity.internalServerError().body("Error: Unable to create new Food and Drink");
        }
        return ResponseEntity.ok("Successful creation for Food and Drink: " + foodDrinksDetails.getItemNumber());
    }

    @GetMapping("/viewFb")
    private ResponseEntity<List<FoodDrinks>> viewFoodDrinks()
    {
        return new ResponseEntity<List<FoodDrinks>>(foodDrinksRepo.findAll(), HttpStatus.OK);
    }

    // /login/manager/{id}
    @DeleteMapping("/{itemNumber}")
    public ResponseEntity<String> deleteFoodDrinks(@PathVariable String itemNumber) {
        Optional<FoodDrinks> optionalFoodDrinks = foodDrinksRepo.findFoodDrinksByItemNumber(itemNumber);

        if (optionalFoodDrinks.isPresent()) {
            FoodDrinks fb = optionalFoodDrinks.get();
            foodDrinksRepo.delete(fb);
            return ResponseEntity.ok("Food Drinks deleted successfully");
        } else {
            return ResponseEntity.internalServerError().body("Food Drinks not found");
        }
    }
}
