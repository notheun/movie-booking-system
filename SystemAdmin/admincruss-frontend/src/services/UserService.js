import http from "../http";

// boundary class - change to UserBoundary.js

class UserService {

    getAllUsers() {
        return http.get("/users");
    }

    getUserById(id) {
        return http.get("/users/" + id);
    }

    createUser(user) {
        return http.post("/users", user);
    }

    updateUser(id, userDetails) {
        return http.put("/users/" + id, userDetails);
    }

    deleteUser(id) {
        return http.delete("/users/" + id);
    }

    findByUsernameContaining(username) {
        return http.get(`/users?username=${username}`);
    }
}

export default new UserService();