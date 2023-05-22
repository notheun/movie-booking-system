import http from "./http";

class UserService {

    /* -------------------- Admin -------------------- */
    getAllUsers() {
        return http.get("/login/admin");
    }

    getUserById(id) {
        return http.get(`/login/admin/${id}`);
    }

    createUser(user) {
        return http.post("/login/admin", user);
    }

    updateUser(id, userDetails) {
        return http.put(`/login/admin/${id}`, userDetails);
    }

    deleteUser(id) {
        return http.delete(`/login/admin/${id}`);
    }

    findByUsernameContainingIgnoreCase(username) {
        return http.get(`/login/admin?username=${username}`);
    }

    /* -------------------- Manager -------------------- */


    /* -------------------- Staff -------------------- */
    getAllCustomers() {
        return http.get("/login/staff/lp");
    }

    findByRole(role) {
        return http.get(`/login/staff/lp?role=${role}`);
    }

    findByRoleAndUsernameContainingIgnoreCase(role, username) {
        return http.get(`/login/staff/lp?role=${role}&username=${username}`);
    }

    /* -------------------- Customer -------------------- */
    findByUsername(username) {
        return http.get(`/login/customer?username=${username}`);
    }

    updateProfile(userDetails) {
        return http.patch("/updateprofile", userDetails);
    }
}

export default new UserService();