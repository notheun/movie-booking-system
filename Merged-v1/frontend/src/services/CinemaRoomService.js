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
}
  
export default new CinemaRoomService();