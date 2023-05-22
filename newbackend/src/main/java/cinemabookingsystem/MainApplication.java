package cinemabookingsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import cinemabookingsystem.service.ImageStorageService;
import jakarta.annotation.Resource;

@SpringBootApplication
public class MainApplication {
	@Resource
	ImageStorageService storageService;
	public static void main(String[] args) {
		SpringApplication.run(MainApplication.class, args);
	}
}
