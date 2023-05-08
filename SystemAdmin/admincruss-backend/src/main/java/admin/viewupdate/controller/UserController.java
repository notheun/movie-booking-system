// Create Spring Rest APIs Controller

package admin.viewupdate.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import admin.viewupdate.model.User;
import admin.viewupdate.repository.UserRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api") // API URL to start with /api
public class UserController {

	@Autowired
	UserRepository userRepository;

	// handle GET HTTP requests (GET can be considered as view)
	// (required=false) : optional param - for search bar (in React - frontend)
	// if param exist -> return list of User with username containing param
	// if no param -> return list of all User
	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers(@RequestParam(required=false) String username) {
		try {
			List<User> users = new ArrayList<User>();

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
	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUserById(@PathVariable("id") String id) {
		Optional<User> userData = userRepository.findById(id);

		// isPresent checks if there is a value in userData
		// returns true if there is
		if (userData.isPresent()) 
			return new ResponseEntity<>(userData.get(), HttpStatus.OK);
		else	
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	// return User by status (isActive)
	@GetMapping("/users/isActive")
	public ResponseEntity<List<User>> getUserByStatus() {
		try {
			List<User> users = userRepository.findByIsActive(true);

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
	@PostMapping("/users")
	public ResponseEntity<User> createUser(@RequestBody User user) {
		try {
			User newUser = userRepository.save(new User(user.getUsername(), 
							user.getEmail(), user.getPassword(), user.getRole(), true));
			
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
	@PutMapping("/users/{id}")
	public ResponseEntity<User> updateUser(@PathVariable("id") String id, @RequestBody User userDetails) {	
		Optional<User> userData = userRepository.findById(id);

		// checks if value exist and gets the user for updateUser object
		// sets new user details and save the updateUser object
		if (userData.isPresent()) {
			User updateUser = userData.get();
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
	@DeleteMapping("/users/{id}")
	public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") String id) {
		try {
			userRepository.deleteById(id);

			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
