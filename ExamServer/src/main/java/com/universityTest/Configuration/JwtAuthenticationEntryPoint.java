package com.universityTest.Configuration;


import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.universityTest.Utility.LoggerUtility;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint{

	private Logger log = LoggerUtility.getLogger(JwtAuthenticationEntryPoint.class);
	
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response
			,AuthenticationException authException) throws IOException, ServletException {
		
		String methodname="commence()";
		log.info(methodname+" called");
		
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized User : Server");
	}

}

