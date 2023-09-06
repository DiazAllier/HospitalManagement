package com.ideas.springboot.backend.clinica.controllers;

import java.io.UnsupportedEncodingException;
import java.time.LocalDate;
import java.time.Period;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ideas.springboot.backend.clinica.config.jwt.JwtUtils;
import com.ideas.springboot.backend.clinica.dao.IRoleDao;
import com.ideas.springboot.backend.clinica.dao.IUserDao;
import com.ideas.springboot.backend.clinica.entities.ConfirmationToken;
import com.ideas.springboot.backend.clinica.entities.Doctor;
import com.ideas.springboot.backend.clinica.entities.Patient;
import com.ideas.springboot.backend.clinica.entities.Role;
import com.ideas.springboot.backend.clinica.entities.User;
import com.ideas.springboot.backend.clinica.entities.enums.ERole;
import com.ideas.springboot.backend.clinica.entities.enums.EType;
import com.ideas.springboot.backend.clinica.payload.request.LoginRequest;
import com.ideas.springboot.backend.clinica.payload.request.RequestChangePassword;
import com.ideas.springboot.backend.clinica.payload.request.SignupRequest;
import com.ideas.springboot.backend.clinica.payload.response.JwtResponse;
import com.ideas.springboot.backend.clinica.payload.response.MessageResponse;
import com.ideas.springboot.backend.clinica.services.ConfirmationTokenService;
import com.ideas.springboot.backend.clinica.services.CustomnUserDetails;
import com.ideas.springboot.backend.clinica.services.DoctorServices;
import com.ideas.springboot.backend.clinica.services.EmailService;
import com.ideas.springboot.backend.clinica.services.PatientsServices;
import com.ideas.springboot.backend.clinica.services.RoleServices;
import com.ideas.springboot.backend.clinica.services.UserServices;

import jakarta.validation.Valid;
import jakarta.mail.MessagingException;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {
	Logger logger = Logger.getLogger(AuthController.class.getName());

	@Autowired
	private ConfirmationTokenService IconfirmationToken;

	@Autowired
	private EmailService mailSender;

	@Autowired
	private UserServices services;

	@Autowired
	private RoleServices roleServices;

	@Autowired
	private IUserDao userDao;

	@Autowired
	private IRoleDao roleDao;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	JwtUtils jwtUtils;

	@Autowired
	private DoctorServices serviceDoctor;

	@Autowired
	private PatientsServices servicesPatients;

	@PostMapping("/auth/signup")
	public ResponseEntity<?> registration(@RequestBody SignupRequest signUpRequest, Errors errors) {

		logger.log(Level.INFO, signUpRequest.toString());
		if (userDao.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
		}
		if (userDao.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already taken!"));
		}

		if (errors.hasErrors()) {
			return ResponseEntity.badRequest().body(new MessageResponse(errors));
		}
		User user = new User();
		user.setUsername(signUpRequest.getUsername());
		user.setEmail(signUpRequest.getEmail());
		user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
		user.setPerson(signUpRequest.getPerson());
		user.getPerson().setEnable(true);
		user.getPerson().setEnable(true);
		user.setEnable(true);

		Integer age = Period.between(user.getPerson().getDob(), LocalDate.now()).getYears();
		user.getPerson().setAge(age);

		EType strType = signUpRequest.getPerson().getType();

		if (strType == EType.PATIENT) {
			signUpRequest.getPerson().setType(EType.PATIENT);
			Patient patient = new Patient();
			patient.setPerson(signUpRequest.getPerson());
			servicesPatients.save(patient);
		}

		if (strType == EType.DOCTOR) {
			signUpRequest.getPerson().setType(EType.DOCTOR);
			Doctor doctor = new Doctor();
			doctor.setPerson(signUpRequest.getPerson());
			serviceDoctor.save(doctor);
		}
		if (strType == null || strType == EType.USER) {
			signUpRequest.getPerson().setType(EType.USER);
		}
		Set<Role> strRoles = null;
		Set<Role> roles = new HashSet<>();
		if (signUpRequest.getRoles() != null) {
			strRoles = roleServices.getRolesByIdIn(signUpRequest.getRoles());
		}
		if (strRoles == null) {
			Role userRole = roleDao.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);

		} else {
			strRoles.forEach(role -> {
				switch (role.getName()) {
				case ROLE_ADMIN:
					Role adminRole = roleDao.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);
					break;
				default:
					Role userRole = roleDao.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
				Role userRole = roleDao.findByName(ERole.ROLE_USER)
						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
				roles.add(userRole);
			});
		}
		user.setRoles(roles);

		user.setImage("https://cdn-icons-png.flaticon.com/512/2102/2102647.png");
		userDao.save(user);
		return ResponseEntity.ok(userDao.save(user));
	}

	@PostMapping("/auth/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest)
			throws UnsupportedEncodingException, MessagingException {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = jwtUtils.generateJwtToken(authentication);

		CustomnUserDetails userDetails = (CustomnUserDetails) authentication.getPrincipal();

		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());

		User user = userDao.findByUsername(loginRequest.getUsername()).get();

		if (!user.isStatus() && IconfirmationToken.findByUser(user).isEmpty()) {
			ConfirmationToken confirmToken = IconfirmationToken.createConfirmationToken(user.getId());
			mailSender.sendEmailConfirmation(user.getEmail(), confirmToken.getConfirmationToken());
		}
		if (!user.isStatus()) {
			return ResponseEntity.badRequest().body(new MessageResponse("Account not verified"));
		}
		return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(),
				userDetails.getEmail(), roles, user.getPerson().getType().name(), user.isEnable()));
	}

	@PostMapping("/auth/verify/{token}")
	public ResponseEntity<?> confirmUserAccount(@Valid @PathVariable String token) throws Exception {
		ConfirmationToken tokenConfirmed = IconfirmationToken.findByConfirmationToken(token).get();

		if (tokenConfirmed != null) {
			User user = userDao.findByEmail(tokenConfirmed.getUser().getEmail());
			user.getPerson().setStatus(true);
			user.setStatus(true);
			services.save(user);
			tokenConfirmed.setStatus("VERIFIED");
			IconfirmationToken.save(tokenConfirmed);
			return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Account Verified"));
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new MessageResponse("The link is invalid or broken!"));
	}

	@GetMapping("/auth/refreshtoken/{token}")
	public ResponseEntity<?> refreshtoken(@Valid @PathVariable String token) {

		boolean auth = jwtUtils.validateJwtToken(token);
		if (auth) {
			return ResponseEntity.ok().body(true);
		}
		return ResponseEntity.badRequest().body(false);
	}

	@PostMapping("/auth/changepassword")
	public ResponseEntity<?> changePassword(@Valid @RequestBody RequestChangePassword request) throws Exception {

		User user = services.findById(request.getUserId());
		boolean check = false;

		if (user.getId() != null) {
			check = passwordEncoder.matches(request.getOldPassword(), user.getPassword());
		}

		user.setPassword(passwordEncoder.encode(request.getNewPassword()));

		if (check) {
			services.save(user);
			return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse("Password changed"));
		}

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MessageResponse("Incorrect password"));
	}

}
