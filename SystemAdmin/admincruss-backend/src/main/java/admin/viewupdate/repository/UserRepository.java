package admin.viewupdate.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import admin.viewupdate.model.User;

public interface UserRepository extends MongoRepository<User, String> {
    List<User> findByUsernameContainingIgnoreCase(String username);
    List<User> findByIsActive(boolean isActive);
}