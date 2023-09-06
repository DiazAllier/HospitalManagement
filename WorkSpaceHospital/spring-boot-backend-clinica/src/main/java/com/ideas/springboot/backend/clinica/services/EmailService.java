package com.ideas.springboot.backend.clinica.services;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender mailSender;

	@Transactional
	public void sendEmail(String to, String subject, String body) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setFrom("ruthless@gmail.com");
		message.setTo(to);
		message.setSubject(subject);
		message.setText(body);

		mailSender.send(message);
	}

	@Transactional
	public void sendEmailConfirmation(String to, String token) throws MessagingException, UnsupportedEncodingException {
		MimeMessage message = mailSender.createMimeMessage();
	    MimeMessageHelper helper = new MimeMessageHelper(message);
		String content = ("<p>Dear " + to + ",<br>" + "Please click the link below to verify your registration:<br></p>"
				+ "<h3>Your code: <p>" + token + "</p></h3>" + "<p>Thank you,<br>" + "Example bussines</p>");


		helper.setFrom("ruthless@gmail.com"); 	
		helper.setTo(to);
		helper.setSubject("Complete Registration!");
		helper.setText(content, true);

		mailSender.send(message);
	}

}
