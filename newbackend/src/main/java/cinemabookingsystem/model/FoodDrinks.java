package cinemabookingsystem.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//auto generates getters setters
@Data
@NoArgsConstructor
@AllArgsConstructor

//name of collection
@Document(collection = "foodDrinks")
public class FoodDrinks {
    @Id
    private String id;    // auto generated in MongoDB
    private String itemNumber;
    private String description;
    private double price;
    private String poster;  // url for the picture

    public FoodDrinks(String itemNumber, String description, double price, String poster)
    {
        this.itemNumber = itemNumber;
        this.description = description;
        this.price = price;
        this.poster = poster;
    }
}
