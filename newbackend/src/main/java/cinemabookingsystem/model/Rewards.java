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
@Document(collection = "rewards")
public class Rewards {
    @Id
    private String id;            //auto generated in MongoDB
    private String rewardNumber;
    private String description;
    private int points;             //loyalty points needed
    private String poster;          //URL for the picture

    public Rewards(String rewardNumber, String description, int points, String poster)
    {
        this.rewardNumber = rewardNumber;
        this.description = description;
        this.points = points;
        this.poster = poster;
    }
}