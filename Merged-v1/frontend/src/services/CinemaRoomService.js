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

  findCinemaRoomByRoomNumber(roomNumber) {
    return http.get(`/room?roomNumber=${roomNumber}`);
  }
}
  
export default new CinemaRoomService();