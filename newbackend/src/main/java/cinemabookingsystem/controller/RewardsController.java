package cinemabookingsystem.controller;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import cinemabookingsystem.repository.RewardsRepository;
import cinemabookingsystem.repository.UserRepository;
import cinemabookingsystem.model.Rewards;
import cinemabookingsystem.model.RewardsDetails;
import cinemabookingsystem.model.Users;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/rewards")
public class RewardsController {
    @Autowired
    private RewardsRepository rewardsRepo;
    @Autowired
    private UserRepository userRepo;

    // both staff and customer lands here
    @GetMapping("/view")
    private ResponseEntity<List<Rewards>> viewReward() {
        return new ResponseEntity<List<Rewards>>(rewardsRepo.findAll(), HttpStatus.OK);
    }

    @PatchMapping("/claim")
    private ResponseEntity<?> claimReward(@RequestBody RewardsDetails rewardDetails) {
        Users user = userRepo.findById(rewardDetails.getUserId()).orElse(null);
        Rewards reward = rewardsRepo.findById(rewardDetails.getRewardId()).orElse(null);

        try {
            if (user.getLoyaltyPoints() < reward.getPoints())
                throw new Exception();  //ie not enough points to claim
            else {
                user.setLoyaltyPoints(user.getLoyaltyPoints() - reward.getPoints());
                userRepo.save(user);
            }
        }
        catch (Exception err){
            return ResponseEntity.internalServerError().body("Error: Unable to claim reward");
        }
            return ResponseEntity.ok(String.format("Successful claim for reward"));
    }

    @GetMapping("/findid/{id}")
	public ResponseEntity<Rewards> findRewardsById(@PathVariable("id") String id) {
        Optional<Rewards> rewards = rewardsRepo.findById(id);
        
        if (rewards.isPresent()) {
            return new ResponseEntity<>(rewards.get(), HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
