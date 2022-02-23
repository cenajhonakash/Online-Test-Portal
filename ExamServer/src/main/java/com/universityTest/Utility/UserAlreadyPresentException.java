package com.universityTest.Utility;

public class UserAlreadyPresentException extends Exception{

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UserAlreadyPresentException() {
		super("Username already present!! try with new username");
		// TODO Auto-generated constructor stub
	}

	public UserAlreadyPresentException(String message) {
		super(message);
	}

}
