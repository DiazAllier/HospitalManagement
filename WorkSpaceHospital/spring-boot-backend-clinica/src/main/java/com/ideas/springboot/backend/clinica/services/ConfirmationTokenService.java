package com.ideas.springboot.backend.clinica.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ideas.springboot.backend.clinica.dao.IConfirmationToken;
import com.ideas.springboot.backend.clinica.dao.IUserDao;
import com.ideas.springboot.backend.clinica.entities.ConfirmationToken;
import com.ideas.springboot.backend.clinica.entities.User;
import com.ideas.springboot.backend.clinica.exception.TokenRefreshException;

@Service
public class ConfirmationTokenService {

	@Autowired
	private IConfirmationToken confirmationTokenRepository;

	@Autowired
	private IUserDao userRepository;

	@Transactional(readOnly = true)
	public Optional<ConfirmationToken> findByConfirmationToken(String token) {
		if (confirmationTokenRepository.findByConfirmationToken(token) == null) {
			throw new TokenRefreshException("Invalid code");
		}
		return Optional.of(confirmationTokenRepository.findByConfirmationToken(token));
	}

	@Transactional
	public ConfirmationToken createConfirmationToken(Long userId) {

		Random random = new Random();
		int max = 90000;
		int min = 10000;
		String token = Integer.toString(random.nextInt(max - min + 1) + min);

		ConfirmationToken confirmationToken = new ConfirmationToken();

		confirmationToken.setUser(userRepository.findById(userId).get());
		confirmationToken.setCreatedDate(new Date());
		confirmationToken.setStatus("PENDING");
		confirmationToken.setConfirmationToken(token);

		confirmationToken = confirmationTokenRepository.save(confirmationToken);
		return confirmationToken;
	}

	@Transactional
	public ConfirmationToken save(ConfirmationToken token) {
		return confirmationTokenRepository.save(token);
	}

	@Transactional(readOnly = true)
	public List<ConfirmationToken> findByUser(User user) {
		return confirmationTokenRepository.findByUser(user);
	}

	@Transactional
	public void delete(ConfirmationToken token) {
		ConfirmationToken tokenFind = confirmationTokenRepository.findByConfirmationToken(token.getConfirmationToken());
		tokenFind.setStatus("DISABLED");
	}
}