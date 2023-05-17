import http from "./http";

class FoodDrinkService {
  uploadImage(formData) {
    return http.post("/fb/uploadImage", formData);
  }

  createFoodDrinks(foodDrinksDetails, imageURL) {
      return http.post("fb/createfb", foodDrinksDetails)
  }

  viewFoodDrinks() {
      return http.get("fb/viewfb");
  }

  deleteFoodDrinks(itemNumber) {
      return http.delete(`/login/manager/${itemNumber}`);
  }
}
  
export default new FoodDrinkService();