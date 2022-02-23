package com.universityTest.Utility;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.slf4j.Logger;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
@Service
public class JwtUtil {
	private Logger log = LoggerUtility.getLogger(JwtUtil.class);
	private String SECRET_KEY = "assesment_server";

    public String extractUsername(String token) {
    	
    	String methodname="extractUsername()";
    	log.info(methodname+" called");
    	
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
    	
    	String methodname="extractExpiration()";
    	log.info(methodname+" called");
    	
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
    	
    	String methodname="extractClaim()";
    	log.info(methodname+" called");
    	
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token) {
    	
    	String methodname="extractAllClaims()";
    	log.info(methodname+" called");
    	
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
    	
    	String methodname="isTokenExpired()";
    	log.info(methodname+" called");
    	
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(UserDetails userDetails) {
    	
    	String methodname="generateToken()";
    	log.info(methodname+" called");
    	
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {

    	String methodname="createToken()";
    	log.info(methodname+" called");
    	
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
    	
    	String methodname="validateToken()";
    	log.info(methodname+" called");
    	
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
