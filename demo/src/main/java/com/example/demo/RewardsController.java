package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
//@RequestMapping("")
public class RewardsController {
    @Autowired
    private RewardsRepository rewardsRepo;

    //both staff and customer lands here
    @GetMapping("/rewards")
    private ResponseEntity<List<Rewards>> viewReward()
    {
        return new ResponseEntity<List<Rewards>>(rewardsRepo.findAll(), HttpStatus.OK);
    }
}
