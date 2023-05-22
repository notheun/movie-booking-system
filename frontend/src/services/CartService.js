import http from "./http";

class CartService {
    trackCart(cartDetails) {
        return http.post("/cart/cartout", cartDetails);
    }

    updateCart(cartDetails) {
        return http.put("/cart/updatecart", cartDetails);
    }

    getCart(userId) {
        return http.get(`/cart/${userId}`)
    }
}
  
export default new CartService();