package cinemabookingsystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.bson.types.ObjectId;

import cinemabookingsystem.repository.ShoppingCartRepository;
import cinemabookingsystem.repository.TicketRepository;
import cinemabookingsystem.repository.UserRepository;
import cinemabookingsystem.model.TicketDetails;
import cinemabookingsystem.model.Tickets;
import cinemabookingsystem.model.Users;

import java.util.Optional;
import java.util.Random;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    @Autowired
    private TicketRepository ticketRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ShoppingCartRepository cartRepo;

    // for customer
    @PostMapping("/checkout")
    private ResponseEntity<?> createTicket(@RequestBody List<TicketDetails> ticketDetailsList) {
        try {
            List<Tickets> tickets = new ArrayList<>();
            

            for (TicketDetails ticketDetails : ticketDetailsList) {
                Tickets ticket = createTickets(ticketDetails);

                Users user = userRepo.findById(ticket.getUser()).orElse(null);
                
                if (user != null && user.getRole().equalsIgnoreCase("customer")) {
                    user.setLoyaltyPoints(user.getLoyaltyPoints() + ticket.getLoyaltyPoints());
                    userRepo.save(user);
                }   

                // prevent duplication of seats
                Optional<Tickets> existingTicket = ticketRepo.findTicketBySeatNumberAndMovie(ticket.getSeatNumber(), ticket.getMovie());
                if (existingTicket.isPresent()) {
                    return ResponseEntity.internalServerError().body("Seats taken");
                }

                tickets.add(ticket);
            }

            if (!tickets.isEmpty()) {
                ticketRepo.saveAll(tickets);
                return ResponseEntity.ok(tickets);
            }
        } catch (Exception err) {
            return ResponseEntity.internalServerError().body("Error: Unsuccessful checkout");
        }
        return ResponseEntity.ok("Successful checkout for movie");
    }

    @PostMapping("/staffcheckout")
    public ResponseEntity<?> createStaffTicket(@RequestBody List<TicketDetails> ticketDetailsList) {
        try {
            List<Tickets> tickets = new ArrayList<>();

            for (TicketDetails ticketDetails : ticketDetailsList) {
                Tickets ticket = createTickets(ticketDetails);

                // prevent duplication of seats
                Optional<Tickets> existingTicket = ticketRepo.findTicketBySeatNumberAndMovie(ticket.getSeatNumber(), ticket.getMovie());
                if (existingTicket.isPresent()) {
                    return ResponseEntity.internalServerError().body("Seats taken");
                }

                tickets.add(ticket);
            }

            if (!tickets.isEmpty()) {
                ticketRepo.saveAll(tickets);
                return ResponseEntity.ok(tickets);
            }
        } catch (Exception err) {
            return ResponseEntity.internalServerError().body("Error: Unsuccessful checkout");
        }

        return ResponseEntity.ok("Successful checkout for movie");
    }

    @GetMapping("/checkticket/{referenceNo}")
    private ResponseEntity<?> checkTicket(@PathVariable String referenceNo) {
        Optional<Tickets> ticket = ticketRepo.findTicketByReferenceNo(referenceNo);
        if (ticket.isPresent())
            return ResponseEntity.ok(ticket.get());
        else
            return ResponseEntity.internalServerError().body("Error: Ticket is not valid");
    }

    private Tickets createTickets(TicketDetails ticketDetails) {
        Tickets ticket = new Tickets();
        ObjectId objectId = new ObjectId(); 
        ticket.setId(objectId.toHexString()); 
        ticket.setReferenceNo(generateRandomString(8));
        ticket.setMovie(ticketDetails.getMovie());
        ticket.setUser(ticketDetails.getUser());
        ticket.setRoom(ticketDetails.getRoom());
        ticket.setSeatNumber(ticketDetails.getSeatNumber());
        ticket.setTicketType(ticketDetails.getTicketType());
        ticket.setPrice(ticketDetails.getPrice()); 
        return ticket;
    }    

    private String generateRandomString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder(length);
        Random random = new Random();

        for (int i = 0; i < length; i++) {
            int randomIndex = random.nextInt(characters.length());
            char randomChar = characters.charAt(randomIndex);
            sb.append(randomChar);
        }
        return sb.toString();
    }

    @GetMapping("/findid/{id}")
	public ResponseEntity<Tickets> findTicketById(@PathVariable("id") String id) {
        Optional<Tickets> rewards = ticketRepo.findById(id);
        
        if (rewards.isPresent()) {
            return new ResponseEntity<>(rewards.get(), HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
