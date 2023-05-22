package cinemabookingsystem.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.List;

//@Document means the class is stored as a document in a collection in mongoDB
//ie to say : instances of the movies class will be stored as a document under the collection in mongoDB
@Document(collection = "movies")
//takes care of boilerplate code - getters, setters etc
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Movies {
    @Id
    private String id;
    private String imdbId;
    private String title;
    private String poster;              //url for the picture
    @DocumentReference
    private List<RateReview> rateReviewIds;
    private double avgRating;
    private String ageRestriction;     //0 for no age restriction, 16, 18, 21
    private String duration;
    private String startTime;
    private String room;

    public Movies(String imdbId, String title, String poster, String ageRestriction, String duration,
                    String startTime, String room)
    {
        this.imdbId = imdbId;
        this.title = title;
        this.poster = poster;
        this.ageRestriction = ageRestriction;
        this.duration = duration;
        this.startTime = startTime;
        this.room = room;
    }
}