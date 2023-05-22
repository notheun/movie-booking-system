import http from "./http";

class FoodDrinkService {
    viewReward() {
        return http.get("/rewards/view");
    }

    claimReward(rewardDetails) {
        return http.patch("/rewards/claim", rewardDetails);
    }

    findRewardsById(rewardId) {
        return http.get(`/rewards/findid/${rewardId}`);
    }
}
  
export default new FoodDrinkService();