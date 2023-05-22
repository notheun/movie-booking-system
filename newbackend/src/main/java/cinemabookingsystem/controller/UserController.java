package cinemabookingsystem.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cinemabookingsystem.model.Users;
import cinemabookingsystem.repository.UserRepository;
import cinemabookingsystem.model.UserDetails;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api") // API URL to start with /api
public class UserController {

	@Autowired
	private UserRepository userRepository;

/* ----------------------------- SYSTEM ADMIN ----------------------------- */	

	// handle GET HTTP requests (GET can be considered as view)
	// (required=false) : optional param - for search bar (in React - frontend)
	// if param exist -> return list of User with username containing param
	// if no param -> return list of all User
	@GetMapping("/login/admin")
	public ResponseEntity<List<Users>> getAllUsers(@RequestParam(required=false) String username) {
		try {
			List<Users> users = new ArrayList<>();

			// username here is param from search bar
			if (username == null) 
				userRepository.findAll().forEach(users::add);
			else
				userRepository.findByUsernameContainingIgnoreCase(username).forEach(users::add);
			// System.out.println("Users found: " + users.size());

			// to return no content if there are no existing users
			if (users.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			// return users if users exist
			return new ResponseEntity<>(users, HttpStatus.OK);
			
		} catch (Exception e) {
			// to catch other exceptions aside from NO_CONTENT
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	// return User by id
	// Optional -> a value may not be returned, basically it can be null
	// in this case, there may not be a User with specified id
	// deals with nullpointerexception
	@GetMapping("/login/admin/{id}")
	public ResponseEntity<Users> getUserById(@PathVariable("id") String id) {
		Optional<Users> userData = userRepository.findById(id);

		// isPresent checks if there is a value in userData
		// returns true if there is
		if (userData.isPresent()) 
			return new ResponseEntity<>(userData.get(), HttpStatus.OK);
		else	
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	// return User by status (isActive)
	@GetMapping("/login/admin/isActive")
	public ResponseEntity<List<Users>> getUserByStatus() {
		try {
			List<Users> users = userRepository.findByIsActive(true);

			if (users.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(users, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// handle POST HTTP requests
	// create id for new User using save() with user details
	@PostMapping("/login/admin")
	public ResponseEntity<Users> createUser(@RequestBody Users user) {
		try {
			Users newUser = userRepository.save(new Users(user.getUsername(), user.getEmail(), 
												user.getPassword(), user.getRole(), true));
			
			return new ResponseEntity<>(newUser, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	// handle PUT HTTP requests
	// find User and update using payload and save()
	// Optional allows userData object to hold null values
	// meaning it will try to find User by id but it and may return null 
	// if there is no user of that id
	// but beacause userData is of Optional class, it still saves null value
	@PutMapping("/login/admin/{id}")
	public ResponseEntity<Users> updateUser(@PathVariable("id") String id, @RequestBody Users userDetails) {	
		Optional<Users> userData = userRepository.findById(id);

		// checks if value exist and gets the user for updateUser object
		// sets new user details and save the updateUser object
		if (userData.isPresent()) {
			Users updateUser = userData.get();
			updateUser.setUsername(userDetails.getUsername());
			updateUser.setEmail(userDetails.getEmail());
			updateUser.setPassword(userDetails.getPassword());
			updateUser.setRole(userDetails.getRole());
			updateUser.setIsActive(userDetails.getIsActive());
			
			return new ResponseEntity<>(userRepository.save(updateUser), HttpStatus.OK);
		} else
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	// handle DELETE HTTP requests
	// find User by id and delete
	@DeleteMapping("/login/admin/{id}")
	public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") String id) {
		try {
			userRepository.deleteById(id);

			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

/* ------------------------------ STAFF ---------------------------------- */

	// for staff to search by username and view loyalty points
	@GetMapping("/login/staff/lp")
	public ResponseEntity<List<Users>> getAllCustomers(@RequestParam(required=false) String username) {
		try {
			List<Users> customers = new ArrayList<>();

			// username here is param from search bar
			// to display only customers and allow search of customers by username
			// checks for role first, display all User that has role = "customer"
			if (username == null) 
				userRepository.findByRole("customer").forEach(customers::add);
			else
				// perform another search by username within the User with role = "customer"
				userRepository.findByRoleAndUsernameContainingIgnoreCase("customer", username).forEach(customers::add);

			// to return no content if there are no existing users
			if (customers.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			// return customers if customer exists
			return new ResponseEntity<>(customers, HttpStatus.OK);
			
		} catch (Exception e) {
			// to catch other exceptions aside from NO_CONTENT
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

/* ------------------------------ CUSTOMER ---------------------------------- */
	// get id during login for customer route `http.localhost:3030/${id}`
	@GetMapping("/login/customer")
	public ResponseEntity<Users> findByUsername(@RequestParam("username") String username) {
		Optional<Users> optionalUser = userRepository.findByUsername(username);

		if (optionalUser.isPresent()) {
			Users user = optionalUser.get();

			return new ResponseEntity<Users>(user, HttpStatus.OK);
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PatchMapping("/updateprofile")
    public ResponseEntity<?> updateUserProfile(@RequestBody UserDetails userDetails) {
        Users user = userRepository.findByUsername(userDetails.getUsername()).orElse(null);

        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword());
        user.setSeatPref(userDetails.getSeatPref());

        try {
            userRepository.save(user);
        }
        catch (Exception err){
            // internalServerError - HTTP 500 status
            return ResponseEntity.internalServerError().body("Error: Unsuccessful user update");
        }
        return ResponseEntity.ok(String.format("Successful user update"));
    }

}