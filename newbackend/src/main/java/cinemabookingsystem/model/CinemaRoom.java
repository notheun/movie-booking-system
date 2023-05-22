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
@Document(collection = "cinemaRoom")
public class CinemaRoom {
    @Id
    private String id;    //auto generated in MongoDB
    private String roomNumber;
    private int numRows;
    private int numCols;

    public CinemaRoom(String roomNumber, int numRows, int numCols)
    {
        this.roomNumber = roomNumber;
        this.numRows = numRows;
        this.numCols = numCols;
    }
}