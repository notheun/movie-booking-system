import http from "./http";

class MovieService {
    getAllMovies() {
        return http.get("/movies/allmovies");
    }

    getSingleMovie(imdbId) {
        return http.get(`/movies/eachmovie/${imdbId}`);
    }

    createMovie(movieDetails) {
        return http.post("/movies/createmovie", movieDetails);
    }

    deleteMovie(imdbId) {
        return http.delete(`/movies/deletemovie/${imdbId}`);
    }
}
  
export default new MovieService();