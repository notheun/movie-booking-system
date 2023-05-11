package cinemabookingsystem.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Document(collection = "users") // override collection name
public class User {
	@Id
	private String id;

	private String username;
	private String email;
	private String password;
	private String role;
	private boolean isActive;
	private int birthYear;
	private int birthMonth;
	private int birthDay;
	private int loyaltyPoints;
	private String seatPref;

	public User(String username, String email, String password, String role, boolean isActive) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
		this.isActive = isActive;
		this.birthYear = birthYear;
        this.birthMonth = birthMonth;
        this.birthDay = birthDay;
		this.loyaltyPoints = 0;
		this.seatPref = seatPref;
	}

}
