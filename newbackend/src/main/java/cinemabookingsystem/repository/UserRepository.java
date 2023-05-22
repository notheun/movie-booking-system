package cinemabookingsystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import cinemabookingsystem.model.Users;

public interface UserRepository extends MongoRepository<Users, String> {
    // admin
    List<Users> findByUsernameContainingIgnoreCase(String username);
    List<Users> findByIsActive(boolean isActive);

    // staff
    List<Users> findByRole(String role);
    List<Users> findByRoleAndUsernameContainingIgnoreCase(String role, String username);

    // ticket
    // for retrieving customer id to create ticket
    Optional<Users> findById(String id);
   
    // login
    Optional<Users> findByUsername(String username);
}