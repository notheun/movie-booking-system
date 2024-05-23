package cinemabookingsystem.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//same as frontend ticketDetails
@Data
@NoArgsConstructor
@AllArgsConstructor

//to create ticket
public class TicketDetails {
    //no need referenceNo, generated by backend
    private String seatNumber;  //Eg. "D6"
    private String movie;
    private String user;
    private String room;
    private String ticketType;
    private double price;
}