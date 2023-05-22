package cinemabookingsystem.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import cinemabookingsystem.model.Tickets;

import java.util.Optional;

@Repository
public interface TicketRepository extends MongoRepository<Tickets, String> {
    Optional<Tickets> findTicketByReferenceNo(String referenceNo);
    Optional<Tickets> findTicketBySeatNumberAndMovie(String seatNumber, String movie);
    Optional<Tickets> findTicketById(String id);
}