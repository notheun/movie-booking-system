package dev.luke.login;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

//auto generates getters setters
@Data
@NoArgsConstructor
@AllArgsConstructor

//name of collection
@Document(collection = "users")
public class Users {

    @Id
    private ObjectId id;
    private String username;
    private String password;
    private String email;
    private String role;
    private boolean isActive;

    public Users(String username, String password, String email, String role, boolean isActive)
    {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.isActive = isActive;
    }

}
