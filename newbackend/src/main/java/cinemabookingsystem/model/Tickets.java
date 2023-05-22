package cinemabookingsystem.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Random;

//auto generates getters setters
@Data
@NoArgsConstructor
@AllArgsConstructor

@Document(collection = "tickets")
public class Tickets {
    @Id
    private String id;    //auto generated in MongoDB
    private final static int loyaltyPoints = 10;    //gives 10 points for each ticket
    private final static int lengthRefNumber = 8;   //length of reference number
    private String seatNumber;  //Eg. "D6"
    private String referenceNo;
    private String movie;     //ObjectId referencing another movie
    private String user;
    private String room;
    private String ticketType;  //adult, child, student, senior
    private double price;

    public int getLoyaltyPoints(){
        return loyaltyPoints;
    }

    public Tickets(String seatNumber, String movie, String user, String room, String ticketType, double price) {
        this.seatNumber = seatNumber;
        this.referenceNo = generateRandomString();
        this.movie = movie;
        this.user = user;
        this.room = room;
        this.ticketType = ticketType;
        this.price = price;
    }

    // constructor for staff purchase
    public Tickets(String seatNumber, String movie, String room, String ticketType, double price) {
        this.seatNumber = seatNumber;
        this.referenceNo = generateRandomString();
        this.movie = movie;
        this.room = room;
        this.ticketType = ticketType;
        this.price = price;
    }

    private String generateRandomString()
    {
        // Characters that can be included in the random string
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        StringBuilder sb = new StringBuilder(lengthRefNumber);
        Random random = new Random();

        // Generate random characters
        for (int i = 0; i < lengthRefNumber; i++) {
            //give a randomIndex in the character
            int randomIndex = random.nextInt(characters.length());
            //uses the randomIndex to give the char at that index
            char randomChar = characters.charAt(randomIndex);
            sb.append(randomChar);
        }
        return sb.toString();
    }
}
