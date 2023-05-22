package cinemabookingsystem.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import cinemabookingsystem.model.LoginRequest;
import cinemabookingsystem.model.RegisterRequest;
import cinemabookingsystem.model.Users;
import cinemabookingsystem.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
// handles incoming request from user using application
@RestController
@RequestMapping("/api/auth")
public class LoginController {

    //auto inject an instance/instantiates a UserRepository object
    @Autowired
    private UserRepository userRepo;

    @PostMapping("/register")
    //taking a registerRequest as a param
    //@RequestBody of registerRequest will map it to the userDetails from frontend
    private ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest)
    {
        // creates a user (customer) - role set to default in frontend
        Users newUser = userRepo.save(new Users(registerRequest.getUsername(), registerRequest.getEmail(), 
                                        registerRequest.getPassword(), registerRequest.getRole(), true, 
                                        registerRequest.getBirthYear(), registerRequest.getBirthMonth(), 
                                        registerRequest.getBirthDay(), registerRequest.getLoyaltyPoints(), 
                                        registerRequest.getSeatPref()));
        try{
            //saves the usr to DB
            userRepo.save(newUser);
        }
        //returns a response
        catch (Exception err){
            return ResponseEntity.ok("Error: Unsuccessful Registration");
        }
        return ResponseEntity.ok("Welcome to films!\nSuccessful Registration: " + registerRequest.getUsername());
    } 

    @PostMapping("/login")
    //taking a loginRequest as a param
    private ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        Optional<Users> user = userRepo.findByUsername(loginRequest.getUsername());
        if (user.isPresent()) {
            //stores the user obj as dbUser
            Users dbUser = user.get();
            //uses dbUser to check
            // checks password first
            if (dbUser.getPassword().equals(loginRequest.getPassword())) {
                // then checks account status
                if (dbUser.getIsActive() == false)
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Account suspended"); // error 403
                else {
                    String accessLevel = dbUser.getRole();
                    if (accessLevel.equals("admin"))
                        // Redirect to relevant pages
                        //.ok() returns HTTP status code 200 - means ok and the landing URL page as a parameter
                        return ResponseEntity.ok("localhost:3000/login/admin");
                    else if (accessLevel.equals("manager"))
                        return ResponseEntity.ok("localhost:3000/login/manager");
                    else if (accessLevel.equals("staff"))
                        return ResponseEntity.ok("localhost:3000/login/staff");
                    else if (accessLevel.equals("customer"))
                        return ResponseEntity.ok("localhost:3000/login/customer");
                }
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect username or password"); // error 401
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found"); // error 404
    }
}
