import http from "./http";

class TicketService {
    createTicket(ticketDetails) {
        return http.post("/tickets/checkout", ticketDetails);
    }

    createStaffTicket(ticketDetails) {
        return http.post("/tickets/staffcheckout", ticketDetails);
    }

    checkTicket(referenceNo) {
        return http.get(`/tickets/checkticket/${referenceNo}`);
    }

    findTicketById(ticketId) {
        return http.get(`/tickets/findid/${ticketId}`);
    }
}
  
export default new TicketService();