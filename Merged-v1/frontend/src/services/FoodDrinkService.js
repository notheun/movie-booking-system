import http from "./http";

class FoodDrinkService {
  createFoodDrinks(foodDrinksDetails, imageURL) {
    return http.post("/fb/createfb", foodDrinksDetails)
  }

  viewFoodDrinks() {
    return http.get("/fb/viewfb");
  }

  deleteFoodDrinks(itemNumber) {
    return http.delete(`/fb/${itemNumber}`);
  }
}
  
export default new FoodDrinkService();