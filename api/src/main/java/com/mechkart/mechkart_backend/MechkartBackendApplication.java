package com.mechkart.mechkart_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication
public class MechkartBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(MechkartBackendApplication.class, args);
	}

}
