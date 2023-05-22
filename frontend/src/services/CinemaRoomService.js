import http from "./http";

class CinemaRoomService {
  createRoom(roomDetails) {
    return http.post("/room/createroom", roomDetails)
  }

  viewRoom() {
    return http.get("/room/viewroom");
  }

  deleteCinemaRoom(roomNumber) {
    return http.delete(`/room/${roomNumber}`);
  }

  // for checking existing room by roomNumber when creating
  findCinemaRoomByRoomNumber(roomNumber) {
    return http.get(`/room?roomNumber=${roomNumber}`);
  }

  // for booking movie
  // use id to return cinemaroom
  getRoomById(id) {
    return http.get(`/room/byid?id=${id}`);
  }
}
  
export default new CinemaRoomService();