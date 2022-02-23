package com.universityTest.Payment;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.universityTest.Model.User;

@Entity
@Table(name = "razor_order")
public class Payment_Order {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long myOrderID;
	
	private String razorOID;
	private String amount;	
	private String receipt;	
	private String status;
	private String paymentID;
	private String order_date;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "userID")
	@JsonIgnore
	private User user;
	
	public Long getMyOrderID() {
		return myOrderID;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public void setMyOrderID(Long myOrderID) {
		this.myOrderID = myOrderID;
	}
	public String getRazorOID() {
		return razorOID;
	}
	public void setRazorOID(String razorOID) {
		this.razorOID = razorOID;
	}
	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getReceipt() {
		return receipt;
	}

	public void setReceipt(String receipt) {
		this.receipt = receipt;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getPaymentID() {
		return paymentID;
	}
	public void setPaymentID(String paymentID) {
		this.paymentID = paymentID;
	}
	public String getOrder_date() {
		return order_date;
	}
	public void setOrder_date(String order_date) {
		this.order_date = order_date;
	}
	
	
	public Payment_Order() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Payment_Order(Long myOrderID, String razorOID, String amount, String receipt, String status,
			String paymentID, String date, User u) {
		super();
		this.myOrderID = myOrderID;
		this.razorOID = razorOID;
		this.amount = amount;
		this.receipt = receipt;
		this.status = status;
		this.paymentID = paymentID;
		this.order_date = date;
		this.user = u;
	}
	
	
}
