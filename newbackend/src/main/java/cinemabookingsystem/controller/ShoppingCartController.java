package cinemabookingsystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import cinemabookingsystem.model.ShoppingCart;
import cinemabookingsystem.model.ShoppingCartDetails;
import cinemabookingsystem.repository.ShoppingCartRepository;

import java.util.*;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/cart")
//NEED THIS TO KEEP TRACK OF THE STATE OF THE CART
public class ShoppingCartController {
    @Autowired
    private ShoppingCartRepository cartRepo;

    @PostMapping("/cartout")  
    //@RequestBody of cartDetails will map it to the cartDetails from frontend
    private ResponseEntity<?> trackCart(@RequestBody ShoppingCartDetails cartDetails)
    {
        List<String> ticketIds = new ArrayList<>();
        List<String> foodDrinkIds = new ArrayList<>();
        List<String> rewardIds = new ArrayList<>();

        String userId = cartDetails.getUserId();
        boolean isCheckedOut = cartDetails.isCheckedOut();

        for(String ticketId : cartDetails.getTicketIds())
        {
            ticketIds.add(ticketId);
        }

        for(String foodDrinkId : cartDetails.getFoodDrinkIds())
        {
            foodDrinkIds.add(foodDrinkId);
        }

        for(String rewardId : cartDetails.getRewardIds())
        {
            rewardIds.add(rewardId);
        }

        ShoppingCart cart = new ShoppingCart(
                userId, isCheckedOut, ticketIds, foodDrinkIds, rewardIds);

        try{
            //save cart to database
            cartRepo.save(cart);
        }
        catch (Exception err){
            // internalServerError - HTTP 500 status
            return ResponseEntity.internalServerError().body("Error: Unsuccessful checkout");
        }
        return ResponseEntity.ok(String.format("Successful checkout"));
    }

    @PutMapping("/updatecart")
    public ResponseEntity<?> updateCart(@RequestBody ShoppingCartDetails cartDetails) {
        try {
            Optional<ShoppingCart> existingCart = cartRepo.findByUserIdAndIsCheckedOut(cartDetails.getUserId(), false);

            if (!existingCart.isPresent()) {
                // Create a new cart
                List<String> ticketIds = new ArrayList<>(cartDetails.getTicketIds());
                List<String> foodDrinkIds = new ArrayList<>(cartDetails.getFoodDrinkIds());
                List<String> rewardIds = new ArrayList<>(cartDetails.getRewardIds());
            
                ShoppingCart newCart = new ShoppingCart(
                        cartDetails.getUserId(),
                        false, // set isCheckedOut to false for new cart
                        ticketIds,
                        foodDrinkIds,
                        rewardIds);
            
                cartRepo.save(newCart); // save new cart 
            } else {
                // Update the existing cart
                ShoppingCart cart = existingCart.get();
            
                cart.getTicketIds().addAll(cartDetails.getTicketIds());
                cart.getFoodDrinkIds().addAll(cartDetails.getFoodDrinkIds());
                cart.getRewardIds().addAll(cartDetails.getRewardIds());

                System.out.println(cartDetails.isCheckedOut());
                // check if the checkout button is clicked
                if (cartDetails.isCheckedOut()) {
                    cart.setIsCheckedOut(true); // set isCheckedOut to true
                    System.out.println(cart.getIsCheckedOut());
                }
            
                cartRepo.save(cart);
            }
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: Unable to update cart");
        }

        return ResponseEntity.ok("Cart updated successfully");
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getCart(@PathVariable String userId) {
        try {
            Optional<ShoppingCart> cart = cartRepo.findByUserIdAndIsCheckedOut(userId, false);
            if (cart.isPresent()) {
                return ResponseEntity.ok(cart.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: Unable to retrieve cart");
        }
    }
}


