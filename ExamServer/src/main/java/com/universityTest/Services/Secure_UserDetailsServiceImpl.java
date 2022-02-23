package com.universityTest.Services;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.universityTest.DAO.UserRepo;
import com.universityTest.Model.User;
import com.universityTest.Utility.LoggerUtility;

@Service
public class Secure_UserDetailsServiceImpl implements UserDetailsService{

	private Logger log = LoggerUtility.getLogger(Secure_UserDetailsServiceImpl.class);
	
	@Autowired
	private UserRepo ur;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {


		String methodname="loadUserByUsername()";
		log.info(methodname+" called");
		
		User u = this.ur.findByUserName(username);
		if(u == null) {
			System.out.println("User not found");
			throw new UsernameNotFoundException("No user found with provided username and password");
		}
		
		return u;
	}

}
