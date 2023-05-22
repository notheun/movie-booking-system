package cinemabookingsystem.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.Period;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Document(collection = "users") // override collection name
public class Users {
	@Id
	private String id;

	private String username;
	private String email;
	private String password;
	private String role;	// admin, manager, staff, customer
	private boolean isActive = true;	// default for new user - true
	private int birthYear;
	private int birthMonth;
	private int birthDay;
	private int age;
	private int loyaltyPoints;
	private String seatPref;

	// Two controller to handle age initialisation error - invalid value for dates (null/0)

	// Constructor for Customer
	public Users(String username, String email, String password, String role, boolean isActive,
		int birthYear, int birthMonth, int birthDay, int loyaltyPoints, String seatPref) 
	{
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;	
		this.isActive = isActive;
		this.birthYear = birthYear;
        this.birthMonth = birthMonth;
        this.birthDay = birthDay;
		this.age = calculateAge();	// based on year, month, day
		this.loyaltyPoints = 0;		// all users start with 0 loyalty points
		this.seatPref = seatPref; 	//"front", "middle", "back". "null" for non customer
	}

	// Constructor for Manager/Staff
	public Users(String username, String email, String password, String role, boolean isActive) 
	{
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;	
		this.isActive = isActive;
	}

	public boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
	}

	public int calculateAge() {
		LocalDate birDate = LocalDate.of(birthYear, birthMonth, birthDay);
		LocalDate currenDate = LocalDate.now();
		Period period = Period.between((birDate), currenDate);

		return period.getYears();
	}
}
