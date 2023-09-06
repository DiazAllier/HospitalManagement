package com.ideas.springboot.backend.clinica.controllers;

import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ideas.springboot.backend.clinica.entities.Invoices;
import com.ideas.springboot.backend.clinica.entities.Order;
import com.ideas.springboot.backend.clinica.entities.Patient;
import com.ideas.springboot.backend.clinica.entities.Product;
import com.ideas.springboot.backend.clinica.entities.enums.OrderStatus;
import com.ideas.springboot.backend.clinica.payload.dto.payment.PurchaseUnits;
import com.ideas.springboot.backend.clinica.payload.request.InvoicesRequest;
import com.ideas.springboot.backend.clinica.payload.request.PaymentRequest;
import com.ideas.springboot.backend.clinica.payload.response.MessageResponse;
import com.ideas.springboot.backend.clinica.services.InvoicesServices;
import com.ideas.springboot.backend.clinica.services.OrderService;
import com.ideas.springboot.backend.clinica.services.PatientsServices;
import com.ideas.springboot.backend.clinica.services.ProductServices;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class InvoicesController {

	Logger logger = Logger.getLogger(AuthController.class.getName());
	@Autowired
	private InvoicesServices services;

	@Autowired
	private OrderService orderServices;

	@Autowired
	private PatientsServices patientService;

	@SuppressWarnings("unused")
	@Autowired
	private ProductServices productService;

	@GetMapping("controller/invoices")
	public ResponseEntity<?> findAll() {
		return ResponseEntity.ok(services.findAll());
	}

	@GetMapping("controller/invoices/{id}")
	public ResponseEntity<?> findById(@PathVariable Long id) {
		return ResponseEntity.ok(services.findById(id));
	}

	@GetMapping("controller/invoices/person/{id}")
	public ResponseEntity<?> findInvoicesById(@PathVariable Long id) {
		return ResponseEntity.ok(services.findGrandByPersonId(id));
	}

	@PostMapping("controller/invoices")
	public ResponseEntity<?> save(@RequestBody InvoicesRequest invoiceRequest) {
		String invoiceNo = Long.toHexString(Double.doubleToLongBits(Math.random()));
		Patient patient = patientService.findById(invoiceRequest.getIdPatient());
		if (patient == null) {
			return ResponseEntity.badRequest().body(new MessageResponse("No patient found"));
		}
		logger.log(Level.INFO, invoiceRequest.toString());
		Invoices invoice = new Invoices();
		invoice.setPatient(patient);
		invoice.setProducts(invoiceRequest.getProducts());
		float totalPrice = 0;

		for (Product product : invoice.getProducts()) {
			totalPrice += product.getPrice();
//			productService.delete(product.getId());
		}
		invoice.setStatus(OrderStatus.CREATED.toString());
		invoice.setTotalPrice(totalPrice);
		invoice.setInvoiceNumber(invoiceNo);
		invoice.setDescription(invoiceRequest.getDescription());
		return ResponseEntity.ok(services.save(invoice));
	}

	@PostMapping("/controller/invoices/success")
	public ResponseEntity<?> paymentSuccess(@RequestBody PaymentRequest request) {
		logger.info(request.toString());
		Order order = new Order();
		order.setPaypalOrderId(request.getOrderId());
		order.setPaypalOrderStatus(request.getOrderId());
		order.setCreateTime(request.getCreateTime());
		order.setUpdateTime(request.getUpdateTime());
		order.setPayerEmail(request.getPayer().getEmail_address());
		request.getPurchaseUnits().stream().forEach(e -> {
			order.setPayeeEmail(e.getPayee().getEmail_address());
			order.setAmount(e.getAmount().getValue());
			order.setCurrencyCode(e.getAmount().getCurrencyCode());
		});
		for (Invoices response : services.findByPersonId(request.getIdPerson())) {
			response.setStatus(OrderStatus.COMPLETED.toString());
			services.save(response);
		}

		return ResponseEntity.ok(orderServices.save(order));
	}

	@DeleteMapping("controller/invoices/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {
//		services.delete(id);
		return ResponseEntity.ok("Role deleted");
	}

}
