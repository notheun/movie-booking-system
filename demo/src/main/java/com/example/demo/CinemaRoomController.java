package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/login/manager")
// handles incoming request from user using application
public class CinemaRoomController {
    @Autowired
    private CinemaRoomRepository cinemaRoomRepo;

    @PostMapping("/createMovieTheatre")
    private ResponseEntity<?> createRoom(@RequestBody CinemaRoomDetails roomDetails)
    {
        CinemaRoom room = new CinemaRoom(roomDetails.getRoomNumber(), roomDetails.getRow(), roomDetails.getColumn());

        try{
            //save user to database
            cinemaRoomRepo.save(room);
        }
        catch (Exception err){
            // internalServerError - HTTP 500 status
            return ResponseEntity.internalServerError().body("Error: Unable to create new theatre");
        }
        return ResponseEntity.ok("Successful creation for Room: " + roomDetails.getRoomNumber());
    }

    @GetMapping("/viewMovieTheatre")
    private ResponseEntity<List<CinemaRoom>> viewRoom()
    {
        return new ResponseEntity<List<CinemaRoom>>(cinemaRoomRepo.findAll(), HttpStatus.OK);
    }

    // /login/manager/{id}
    @DeleteMapping("/{roomNumber}")
    public ResponseEntity<String> deleteCinemaRoom(@PathVariable String roomNumber) {
        Optional<CinemaRoom> optionalCinemaRoom = cinemaRoomRepo.findCinemaRoomByRoomNumber(roomNumber);

        if (optionalCinemaRoom.isPresent()) {
            CinemaRoom cinemaRoom = optionalCinemaRoom.get();
            cinemaRoomRepo.delete(cinemaRoom);
            return ResponseEntity.ok("Cinema room deleted successfully");
        } else {
            return ResponseEntity.internalServerError().body("Cinema room not found");
        }
    }
}
