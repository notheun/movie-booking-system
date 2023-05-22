package cinemabookingsystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import cinemabookingsystem.model.CinemaRoom;
import cinemabookingsystem.model.CinemaRoomDetails;
import cinemabookingsystem.repository.CinemaRoomRepository;;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/room")
// handles incoming request from user using application
public class CinemaRoomController {
    @Autowired
    private CinemaRoomRepository cinemaRoomRepo;

    @PostMapping("/createroom")
    private ResponseEntity<?> createRoom(@RequestBody CinemaRoomDetails roomDetails)
    {
        CinemaRoom room = new CinemaRoom(roomDetails.getRoomNumber(), roomDetails.getNumRows(), roomDetails.getNumCols());

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

    @GetMapping("/viewroom")
    private ResponseEntity<List<CinemaRoom>> viewRoom() {
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

    @GetMapping("")
    public ResponseEntity<CinemaRoom> findCinemaRoomByRoomNumber(@RequestParam("roomNumber") String roomNumber) {
        Optional<CinemaRoom> optionalCinemaRoom = cinemaRoomRepo.findCinemaRoomByRoomNumber(roomNumber);
    
        if (optionalCinemaRoom.isPresent()) {
            CinemaRoom cinemaRoom = optionalCinemaRoom.get();

            return new ResponseEntity<CinemaRoom>(cinemaRoom, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/byid")
    public ResponseEntity<?> findCinemaRoomById(@RequestParam("id") String id) {
        try {
            Optional<CinemaRoom> optionalCinemaRoom = cinemaRoomRepo.findCinemaRoomById(id);

            if (optionalCinemaRoom.isPresent()) {
                CinemaRoom cinemaRoom = optionalCinemaRoom.get();
                return ResponseEntity.ok(cinemaRoom);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid ID format");
        }
    }
}