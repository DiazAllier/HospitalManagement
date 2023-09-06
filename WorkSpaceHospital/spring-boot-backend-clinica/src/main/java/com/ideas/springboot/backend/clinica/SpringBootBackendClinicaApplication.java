package com.ideas.springboot.backend.clinica;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class SpringBootBackendClinicaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootBackendClinicaApplication.class, args);
	}
	
}
