package com.example.demo;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TicketRepository extends MongoRepository<Tickets, ObjectId> {
    Optional<Tickets> findTicketByReferenceNo(String referenceNo);
}
