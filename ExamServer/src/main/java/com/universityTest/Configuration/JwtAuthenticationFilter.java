package com.universityTest.Configuration;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.universityTest.Services.Secure_UserDetailsServiceImpl;
import com.universityTest.Utility.JwtUtil;
import com.universityTest.Utility.LoggerUtility;

import io.jsonwebtoken.ExpiredJwtException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{

	@Autowired
	private Secure_UserDetailsServiceImpl servImpl;
	
	@Autowired
	private JwtUtil jwtutil;
	
	private Logger log = LoggerUtility.getLogger(JwtAuthenticationFilter.class);
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) 
			throws ServletException, IOException {
		
	
		String methodname="doFilterInternal()";
		log.info(methodname+" called");
		
		final String TokenHeader = request.getHeader("Authorization");
		System.out.println("Generated token = " + TokenHeader);
		
		String userName=null, jwtToken=null;
		
		if(TokenHeader != null && TokenHeader.startsWith("Bearer")) {		
			jwtToken = TokenHeader.substring(7);
			
			try {
				userName = this.jwtutil.extractUsername(jwtToken);
			} catch (ExpiredJwtException e) {
				e.printStackTrace();
				System.out.println("Token expired");
				//throw new ExpiredJwtException(null, null, "Token Expired and Session is closed!!!");				
			}catch (Exception e) {
				e.printStackTrace();
			}
			
		}else{System.out.println("Invalid token");}
		
		//user is validated
		if(userName != null  && SecurityContextHolder.getContext().getAuthentication() == null) {
			final UserDetails userDetails = this.servImpl.loadUserByUsername(userName);
			if(this.jwtutil.validateToken(jwtToken, userDetails)) {
				//valid token
				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				
				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
			else {
				System.out.println("Invalid Token");
			}
		}
		
		filterChain.doFilter(request, response);
	}

}
