import http from "./http";

// boundary class - change to UserBoundary.js

class UserService {

/* --------------------------UserController--------------------------- */
    /* ----- Admin ----- */
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

    /* ----- Manager ----- */

    /* ----- Staff ----- */
    getAllCustomers() {
        return http.get("/login/staff");
    }

    findByRole(role) {
        return http.get(`/login/staff?role=${role}`);
    }

    findByRoleAndUsernameContainingIgnoreCase(role, username) {
        return http.get(`/login/staff?role=${role}&username=${username}`);
    }

    /* ----- Customer ----- */
    

/* --------------------------ReviewsController--------------------------- */
    createReviews(reviewBody, imdbId) {
        const payload = {
            reviewBody: reviewBody,
            imdbId: imdbId
        };

        return http.post("/v1/reviews", payload);
    }

/* --------------------------MoviesController--------------------------- */
    getAllMovies() {
        return http.get("/login/manager");
    }

    findMovieByImdbId(imdbId) {
        return http.post(`/login/manager/${imdbId}`);
        return http.post("/login/staff");
    }
}

export default new UserService();