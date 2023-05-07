package admin.viewupdate.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users") // override collection name
public class User {
	@Id
	private String id;

	private String username;
	private String email;
	private String role;
	private boolean isActive;

	public User() {

	}

	public User(String username, String email, String role, boolean isActive) {
		this.username = username;
		this.email = email;
		this.role = role;
		this.isActive = isActive;
	}

	public String getId() {
		return id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
	}
}
