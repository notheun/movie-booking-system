package cinemabookingsystem.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieDetails {
    private String imdbId;
    private String title;
    private String poster;              //url for the picture
    private String ageRestriction;     //0 for no age restriction, 16, 18, 21
    private String duration;
    private String startTime;
    private String room;
}
