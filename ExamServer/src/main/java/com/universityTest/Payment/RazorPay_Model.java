package com.universityTest.Payment;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("razorpay")
public class RazorPay_Model {

	//@Value("{${razorpay.RazorPay_Model.key_Id}}")
	String key_Id;
	//@Value("{${razorpay.RazorPay_Model.secret_key}}")
	String secret_key;
	
	public String getKey_Id() {
		return key_Id;
	}

	public String getSecret_key() {
		return secret_key;
	}

	@Override
	public String toString() {
		return "RazorPay_Model [key_Id=" + key_Id + ", secret_key=" + secret_key + "]";
	}
	
	
}
