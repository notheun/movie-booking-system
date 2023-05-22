package cinemabookingsystem.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import cinemabookingsystem.model.CinemaRoom;

@Repository
public interface CinemaRoomRepository extends MongoRepository<CinemaRoom, String> {
    Optional<CinemaRoom> findCinemaRoomByRoomNumber(String roomNumber);
    Optional<CinemaRoom> findCinemaRoomById(String id);
}