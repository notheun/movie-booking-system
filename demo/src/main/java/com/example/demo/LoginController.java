package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@CrossOrigin(origins = "*")
// handles incoming request from user using application
@RestController
public class LoginController {

    //auto inject an instance/instantiates a UserRepository object
    @Autowired
    private UserRepository userRepo;

    @PostMapping("/register")
    //taking a registerRequest as a param
    //@RequestBody of registerRequest will map it to the userDetails from frontend
    private ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest)
    {
        //creates a user
        Users user = new Users(registerRequest.getUsername(),registerRequest.getPassword(), registerRequest.getEmail(),
                                registerRequest.getRole(), registerRequest.isActive(),
                                registerRequest.getBirthYear(), registerRequest.getBirthMonth(), registerRequest.getBirthDay(),
                                registerRequest.getSeatPref());

        try{
            //save user to database
            userRepo.save(user);
        }
        catch (Exception err){
            // internalServerError - HTTP 500 status
            return ResponseEntity.internalServerError().body("Error: Unsuccessful Registration");
        }
        return ResponseEntity.ok("Welcome to films!\nSuccessful Registration: " + registerRequest.getUsername());
    }

    @PostMapping("/api/auth")
    //taking a loginRequest as a param
    private ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest)
    {
        Optional<Users> user = userRepo.findByUsername(loginRequest.getUsername());
        if (user.isPresent()) {
            //stores the user obj as dbUser
            Users dbUser = user.get();
            //uses dbUser to check
            if (dbUser.getPassword().equals(loginRequest.getPassword())) {
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
            else
                return ResponseEntity.internalServerError().body("Error: Unable to login - incorrect password");
        }
        else
            //user not found. internalServerError - HTTP 500 status
            return ResponseEntity.internalServerError().body("Error: Unable to login - incorrect username");

        return null;
    }
}
