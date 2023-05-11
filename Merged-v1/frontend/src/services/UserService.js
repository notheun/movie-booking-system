import http from "./http";

// boundary class - change to UserBoundary.js

class UserService {

/* --------------------------UserController---------------------------*/
    getAllUsers() {
        return http.get("/login/admin");
    }

    getUserById(id) {
        return http.get("/login/admin/" + id);
    }

    createUser(user) {
        return http.post("/login/admin", user);
    }

    updateUser(id, userDetails) {
        return http.put("/login/admin/" + id, userDetails);
    }

    deleteUser(id) {
        return http.delete("/login/admin/" + id);
    }

    findByUsernameContainingIgnoreCase(username) {
        return http.get("/login/admin?username=" + username);
    }

    getAllCustomers() {
        return http.get("/login/staff");
    }

    findByRole(role) {
        return http.get("/login/staff?role=" + role);
    }

    findByRoleAndUsernameContainingIgnoreCase(role, username) {
        return http.get("/login/staff?role=" + role + "&username=" + username);
    }

    

/* --------------------------LoginController---------------------------*/
    registerUser(registerRequest) {
        return http.post("/auth/register", registerRequest)
    }

    loginUser(loginRequest) {
        return http.post("/auth/login", loginRequest);
    }
}

export default new UserService();