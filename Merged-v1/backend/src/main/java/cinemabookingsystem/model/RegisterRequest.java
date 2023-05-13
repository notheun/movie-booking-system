package cinemabookingsystem.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//same as frontend userDetails
@Data
@NoArgsConstructor
@AllArgsConstructor

public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private String role;
    private boolean isActive = true;
    private int birthYear;
	private int birthMonth;
	private int birthDay;
	private int loyaltyPoints = 0;
	private String seatPref;
}