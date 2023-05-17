import http from "./http";


class LoginService {
    registerUser(registerRequest) {
        return http.post("/auth/register", registerRequest)
    }

    loginUser(loginRequest) {
        return http.post("/auth/login", loginRequest);
    }
}

export default new LoginService();