import http from "./http";

class ReportService {
    generateReport() {
        return http.get("/report")
    }
}
  
export default new ReportService();