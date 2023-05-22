package cinemabookingsystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import cinemabookingsystem.repository.FoodDrinksRepository;
import cinemabookingsystem.model.FoodDrinks;
import cinemabookingsystem.service.ImageStorageService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/fb")
public class FoodDrinksController {

    private FoodDrinksRepository foodDrinksRepo;
    private ImageStorageService storageService;

    public FoodDrinksController(FoodDrinksRepository foodDrinksRepo, ImageStorageService storageService) {
        this.foodDrinksRepo = foodDrinksRepo;
        this.storageService = storageService;
    }

    @PostMapping("/createfb")
    public ResponseEntity<?> createFoodDrinks(@RequestBody FoodDrinks foodDrinks) {
        try {
            // Save food and drinks to the database
            FoodDrinks savedFoodDrinks = foodDrinksRepo.save(foodDrinks);
        
            return ResponseEntity.ok("Successful creation for Food and Drink: " + savedFoodDrinks.getItemNumber());
        } catch (Exception err) {
            // Internal Server Error - HTTP 500 status
            return ResponseEntity.internalServerError().body("Error: Unable to create new Food and Drink");
        }
    }

    @GetMapping("/viewfb")
    private ResponseEntity<List<FoodDrinks>> viewFoodDrinks() {
        List<FoodDrinks> foodDrinksList = foodDrinksRepo.findAll();

        // Set the image URL for each food and drinks item
        for (FoodDrinks foodDrinks : foodDrinksList) {
            String imageUrl = foodDrinks.getPoster();
            foodDrinks.setPoster(imageUrl);
        }

        return new ResponseEntity<>(foodDrinksList, HttpStatus.OK);
    }

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

	@GetMapping("/findid/{id}")
	public ResponseEntity<FoodDrinks> findFoodDrinksById(@PathVariable("id") String id) {
        Optional<FoodDrinks> foodDrinks = foodDrinksRepo.findById(id);
        
        if (foodDrinks.isPresent()) {
            return new ResponseEntity<>(foodDrinks.get(), HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
