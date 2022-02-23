package com.universityTest.Model;

//to send the jwt token
public class JwtResponse {

	String token;
	String razor_secretKey;

	public JwtResponse(){}

	public JwtResponse(String token) {
		
		this.token = token;
	}

	public JwtResponse(String token, String razor_secretKey) {
		super();
		this.token = token;
		this.razor_secretKey = razor_secretKey;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getRazor_secretKey() {
		return razor_secretKey;
	}
	
}
