package com.ideas.springboot.backend.clinica.entities;

import java.util.Date;

import com.ideas.springboot.backend.clinica.payload.dto.payment.PayeeDTO;
import com.ideas.springboot.backend.clinica.payload.dto.payment.PayerDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column(name = "paypal_order_id")
	private String paypalOrderId;
	@Column(name = "paypal_order_status")
	private String paypalOrderStatus;
	@Column(name = "createTime")
	private Date createTime;
	@Column(name = "update_time")
	private Date updateTime;
	@Column(name = "amount")
	private String amount;
	@Column(name = "currency_code")
	private String currencyCode;
	@Column(name = "payer_email")
	private String payerEmail;
	@Column(name = "payee_email")
	private String payeeEmail;
	
	

	public String getPayerEmail() {
		return payerEmail;
	}

	public void setPayerEmail(String payerEmail) {
		this.payerEmail = payerEmail;
	}

	public String getPayeeEmail() {
		return payeeEmail;
	}

	public void setPayeeEmail(String payeeEmail) {
		this.payeeEmail = payeeEmail;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getCurrencyCode() {
		return currencyCode;
	}

	public void setCurrencyCode(String currencyCode) {
		this.currencyCode = currencyCode;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date create_time) {
		this.createTime = create_time;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPaypalOrderId() {
		return paypalOrderId;
	}

	public void setPaypalOrderId(String paypalOrderId) {
		this.paypalOrderId = paypalOrderId;
	}

	public String getPaypalOrderStatus() {
		return paypalOrderStatus;
	}

	public void setPaypalOrderStatus(String paypalOrderStatus) {
		this.paypalOrderStatus = paypalOrderStatus;
	}

}
