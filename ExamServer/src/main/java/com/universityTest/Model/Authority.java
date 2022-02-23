package com.universityTest.Model;

import org.springframework.security.core.GrantedAuthority;

//@JsonDeserialize(as = Cat.class)
public class Authority implements GrantedAuthority{

	private String authority;
	
	/*
	 * public void setAuthority(String authority) { this.authority = authority; }
	 */

	public Authority(String authority) {
		super();
		this.authority = authority;
	}

	@Override
	public String getAuthority() {
		// TODO Auto-generated method stub
		return this.authority;
	}

}
