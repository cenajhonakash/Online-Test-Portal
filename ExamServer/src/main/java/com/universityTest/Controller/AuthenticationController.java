package com.universityTest.Controller;

import java.security.Principal;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.universityTest.Model.JwtRequest;
import com.universityTest.Model.JwtResponse;
import com.universityTest.Model.User;
import com.universityTest.Services.Secure_UserDetailsServiceImpl;
import com.universityTest.Utility.JwtUtil;
import com.universityTest.Utility.LoggerUtility;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class AuthenticationController {

	private Logger log = LoggerUtility.getLogger(AuthenticationController.class);
	
	@Autowired
	private AuthenticationManager authManager;
	@Autowired
	private Secure_UserDetailsServiceImpl servImpl;
	@Autowired
	private JwtUtil jwtUtil;
	
	@Value("${RazorPay_Model.secret_key}")
	String secret_key;
	
	public void authenticateUser(String userName, String pass) throws Exception {


		String methodname="authenticateUser()";
		log.info(methodname+" called");
		
		try {
			//System.out.println("user = "+userName +" pass = "+pass);
			authManager.authenticate(new UsernamePasswordAuthenticationToken(userName, pass));			
		}catch (DisabledException e){
			//System.out.println("User is disabled" );
			e.printStackTrace();
			throw new Exception("USER DISABLED");
		}
		catch (BadCredentialsException e) {
			throw new Exception("Invalid Credentials "+ e.getMessage());
		}
	}

	//@CrossOrigin(origins = "http://localhost:4200")
	@PostMapping("/generateToken")
	public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtReq) throws Exception{
		
		String methodname="generateToken()";
		log.info(methodname+" called");
		
		try {
			authenticateUser(jwtReq.getUserName(), jwtReq.getPassWord());			
		} catch (UsernameNotFoundException e) {
			e.printStackTrace();
			throw new Exception("Username not found "+ e.getMessage());
		}
		
		JwtResponse j = new JwtResponse();
		System.out.println(j.getRazor_secretKey());
		UserDetails ud = this.servImpl.loadUserByUsername(jwtReq.getUserName());
		String token = this.jwtUtil.generateToken(ud);
		return ResponseEntity.ok(new JwtResponse(token,secret_key));
	}
	
	@GetMapping("/currentUser")
	public User getCurrentUser(Principal p) {
		
		String methodname="getCurrentUser()";
		log.info(methodname+" called");
		
		return (User)this.servImpl.loadUserByUsername(p.getName());
	}
}
