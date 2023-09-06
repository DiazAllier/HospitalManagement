package com.ideas.springboot.backend.clinica.controllers;

import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ideas.springboot.backend.clinica.entities.ConfirmationToken;
import com.ideas.springboot.backend.clinica.entities.Person;
import com.ideas.springboot.backend.clinica.entities.User;
import com.ideas.springboot.backend.clinica.payload.response.MessageResponse;
import com.ideas.springboot.backend.clinica.services.ConfirmationTokenService;
import com.ideas.springboot.backend.clinica.services.PersonServices;
import com.ideas.springboot.backend.clinica.services.UserServices;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserController {

	Logger logger = Logger.getLogger(AuthController.class.getName());
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserServices services;

	@Autowired
	private PersonServices servicesPerson;

	@Autowired
	private ConfirmationTokenService IconfirmationToken;

	@GetMapping("controller/users")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> findAll() {
		return ResponseEntity.ok(services.findAll());
	}

	@GetMapping("controller/users/{id}")
	@PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
	public ResponseEntity<?> findById(@PathVariable Long id) {
		return ResponseEntity.ok(services.findById(id));
	}

	@GetMapping("controller/users/find/{username}")
	@PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
	public ResponseEntity<?> findByUsername(@PathVariable String username) {
		return ResponseEntity.ok(services.findUserByUsername(username));
	}

	@PostMapping("controller/users")
	@PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
	public ResponseEntity<?> save(@RequestBody User user) {
		return ResponseEntity.ok(services.save(user));
	}

	@PutMapping("controller/users/{id}")
	@PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
	public ResponseEntity<?> saveEdit(@RequestBody User user, @PathVariable Long id) {
		User userDbb = services.findById(id);
		userDbb.setUsername(user.getUsername());
		userDbb.setPassword(passwordEncoder.encode(user.getPassword()));
		userDbb.setEmail(user.getEmail());
		userDbb.setRoles(user.getRoles());
		userDbb.setImage(user.getImage());
		userDbb.setPerson(user.getPerson());
		return ResponseEntity.ok(services.save(userDbb));
	}

	@DeleteMapping("controller/users/{id}")
	@PreAuthorize("hasRole('USER')  or hasRole('ADMIN')")
	public ResponseEntity<?> delete(@PathVariable Long id) throws Exception {
		User user = services.findById(id);
		Person person = servicesPerson.findByEmail(user.getEmail());
		ConfirmationToken token = IconfirmationToken.findByUser(user).get(0);
		services.delete(id);
		IconfirmationToken.delete(token);
		servicesPerson.delete(person.getId());
		return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("User deleted"));
	}
}
