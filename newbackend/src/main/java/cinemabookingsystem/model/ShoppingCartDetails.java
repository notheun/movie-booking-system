package cinemabookingsystem.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingCartDetails {
    private String userId;   
    @JsonProperty           //each shopping cart can only have 1 user logged in
    private boolean isCheckedOut;
    private List<String> ticketIds;     //each shopping cart can have >1 ticket
    private List<String> foodDrinkIds;  //same for foodDrinks
    private List<String> rewardIds;     //same for rewards
}