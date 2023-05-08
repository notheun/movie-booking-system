//the project metadata -> com.example is the group, demo is the name
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//annotations - let the computer know what this class does
@SpringBootApplication
//the RestController annotations means that the methods will return a JSON / XML data format when application receives request
//@RestController
public class DemoApplication {
	public static void main(String[] args)
	{
		SpringApplication.run(DemoApplication.class, args);
	}

	/*@GetMapping("/")
	public String apiEndPoint(){
		return "Hello, Spring  Boot!";
	}*/
}
