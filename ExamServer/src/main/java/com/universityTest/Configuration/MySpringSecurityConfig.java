
package com.universityTest.Configuration;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.universityTest.Services.Secure_UserDetailsServiceImpl;
import com.universityTest.Utility.LoggerUtility;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true) //to provide access of api to user as per role
public class MySpringSecurityConfig extends WebSecurityConfigurerAdapter{

	private Logger log = LoggerUtility.getLogger(MySpringSecurityConfig.class);
	
	@Autowired
	private Secure_UserDetailsServiceImpl servImpl;	
	@Autowired
	private JwtAuthenticationEntryPoint entryPointUnauthorizedHandler;
	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {return new BCryptPasswordEncoder();}
	
	@Bean
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {return super.authenticationManagerBean();}
	
	@Override // to provide authentication type like in-memory auth/database auth etc
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		
		String methodname="configure(AuthenticationManagerBuilder auth)";
		log.info(methodname+" called");
		
		auth.userDetailsService(this.servImpl) // will always call the loadUserByUsername(String username) method internally
		.passwordEncoder(passwordEncoder());
	}

	@Override //used to permitt endpoints + session creation policy
	protected void configure(HttpSecurity http) throws Exception {
		
		String methodname="configure(HttpSecurity http)";
		log.info(methodname+" called");
		
		http.csrf().disable().cors().disable().authorizeRequests()
		.antMatchers("/generateToken","/user/").permitAll()
		.antMatchers(HttpMethod.OPTIONS).permitAll()
		.anyRequest().authenticated()
		.and()
		.exceptionHandling().authenticationEntryPoint(entryPointUnauthorizedHandler)
		.and()
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
	}
	
	

}
