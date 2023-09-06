package com.ideas.springboot.backend.clinica.payload.dto.payment;

import java.io.Serializable;
import java.util.Date;

public class PurchaseUnits implements Serializable{
	private static final long serialVersionUID = 1L;
	private MoneyDTO amount;
	private PaymentsDTO payments;
	private PayeeDTO payee;
	private Date createTime;
	private Date updateTime;
	
	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public MoneyDTO getAmount() {
		return amount;
	}

	public void setAmount(MoneyDTO amount) {
		this.amount = amount;
	}

	public PaymentsDTO getPayments() {
		return payments;
	}

	public void setPayments(PaymentsDTO payments) {
		this.payments = payments;
	}

	public PayeeDTO getPayee() {
		return payee;
	}

	public void setPayee(PayeeDTO payee) {
		this.payee = payee;
	}

	@Override
	public String toString() {
		return "PurchaseUnits [amount=" + amount + ", payments=" + payments + ", payee=" + payee + "]";
	}


	
    
}
