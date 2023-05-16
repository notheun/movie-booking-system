package com.example.demo;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
//the 2 fields are the entity and the data type of Id of entity
public interface UserRepository extends MongoRepository<Users, ObjectId> {
    /*
    even though findByUsername method is not specified
    Spring Data MongoDB can infer from the method name to
    automatically generate a MongoDB query
     */
    Optional<Users> findByUsername(String username);
}
