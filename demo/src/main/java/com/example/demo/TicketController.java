package com.example.demo;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*")
// handles incoming request from user using application
@RestController
public class TicketController {
    //auto inject an instance/instantiates a ticketRepository object
    @Autowired
    private TicketRepository ticketRepo;
    @Autowired
    private UserRepository userRepo;


    @PostMapping("/checkout")
    //taking a registerRequest as a param
    //@RequestBody of registerRequest will map it to the userDetails from frontend
    private ResponseEntity<?> createTicket(@RequestBody TicketDetails ticketDetails)
    {

        /*creates a ticket
        Tickets ticket = new Tickets(ticketDetails.getSeatNumber(), ticketDetails.getMovie(), ticketDetails.getUser(),
                                        ticketDetails.getRoom(), ticketDetails.getTicketType(), ticketDetails.getPrice());*/

        //IMPT! : frontend to pass movie,user and room objectId as a string! - without the $oid
        ObjectId movieId = new ObjectId(String.valueOf(ticketDetails.getMovie()));
        ObjectId userId = new ObjectId(String.valueOf(ticketDetails.getUser()));
        ObjectId roomId = new ObjectId(String.valueOf(ticketDetails.getRoom()));

        Tickets ticket = new Tickets(
                ticketDetails.getSeatNumber(),
                movieId,
                userId,
                roomId,
                ticketDetails.getTicketType(),
                ticketDetails.getPrice()
        );

        try{
            //save user to database
            ticketRepo.save(ticket);

            Users user = userRepo.findById(ticket.getUser()).orElse(null);
            if(user.getRole().equalsIgnoreCase("customer")) {
                user.setLoyaltyPoints(user.getLoyaltyPoints() + ticket.getLoyaltyPoints());
                //updates mongoDB
                userRepo.save(user);
            }
        }
        catch (Exception err){
            // internalServerError - HTTP 500 status
            return ResponseEntity.internalServerError().body("Error: Unsuccessful checkout");
        }
        return ResponseEntity.ok(String.format("Successful checkout for movie"));
    }

    @GetMapping("/checkTicket/{referenceNo}")
    private ResponseEntity<?> checkTicket(@PathVariable String referenceNo)
    {
         Optional<Tickets> ticket = ticketRepo.findTicketByReferenceNo(referenceNo);

        System.out.println(ticket);

         if(ticket.isPresent())
             return ResponseEntity.ok("Success: Ticket is valid");
         else
             return ResponseEntity.internalServerError().body("Error: Ticket is not valid");
    }
}
