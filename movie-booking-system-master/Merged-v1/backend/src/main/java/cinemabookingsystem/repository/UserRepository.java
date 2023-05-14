package cinemabookingsystem.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import cinemabookingsystem.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    // admin
    List<User> findByUsernameContainingIgnoreCase(String username);
    List<User> findByIsActive(boolean isActive);

    // staff
    List<User> findByRole(String role);
    List<User> findByRoleAndUsernameContainingIgnoreCase(String role, String username);

    /*
    even though findByUsername method is not specified
    Spring Data MongoDB can infer from the method name to
    automatically generate a MongoDB query
    */
    // login
    Optional<User> findByUsername(String username);
}