package com.example.demo;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/login/manager")

//uses the ticket repository - eg. sales need all tickets
public class ReportController {
    @Autowired
    private TicketRepository ticketRepo;
    @Autowired
    private MoviesRepository movieRepo; //for break down for each movie

    @GetMapping("/report")
    public ResponseEntity<?> generateReport() {
        try {
            List<Tickets> tickets = ticketRepo.findAll();
            double totalSales = 0.0;
            Map<String, Double> movieSalesMap = new HashMap<>();

            for (Tickets ticket : tickets) {
                double ticketPrice = ticket.getPrice();
                totalSales += ticketPrice;

                String movieId = ticket.getMovie().toString();
                double movieSales = movieSalesMap.getOrDefault(movieId, 0.0);
                movieSales += ticketPrice;
                movieSalesMap.put(movieId, movieSales);
            }

            StringBuilder reportBuilder = new StringBuilder();
            reportBuilder.append("Total Sales: $").append(totalSales).append("\n");
            reportBuilder.append("Movie Sales Breakdown: \n");
            for (Map.Entry<String, Double> entry : movieSalesMap.entrySet()) {
                String movieId = entry.getKey();
                //System.out.println(movieId);
                double movieSales = entry.getValue();
                Movies movie = movieRepo.findById(new ObjectId(movieId)).orElse(null);
                //System.out.println(movie);
                if (movie != null) {
                    reportBuilder.append("Movie: ").append(movie.getTitle()).append(", Sales: $").append(movieSales).append("\n");
                }
            }

            return ResponseEntity.ok(reportBuilder.toString());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error generating report");
        }
    }
}
