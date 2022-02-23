package com.universityTest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.universityTest.Services.UserServiceImpl;

@SpringBootApplication
public class ExamServerApplication implements CommandLineRunner{

//	@SuppressWarnings("deprecation")
//	@Bean
//	public WebMvcConfigurer corsConfigurer() {
//	    return new WebMvcConfigurerAdapter() {
//	        @Override
//	        public void addCorsMappings(CorsRegistry registry) {
//	            registry.addMapping("/**")
//	                    .allowedOrigins("*")
//	                    .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS")
//	                    .allowedHeaders("*", "Access-Control-Allow-Headers", "origin", "Content-type", "accept", "x-requested-with", "x-requested-by") //What is this for?
//	                    .allowCredentials(true);
//	        }
//	    };
//	}
   
	@Autowired
	UserServiceImpl userv;
	
//		@Value("{${RazorPay_Model.key_Id}}")
//		String key_Id;
//		@Value("{${RazorPay_Model.secret_key}}")
//		String secret_key;
//		
	
	public static void main(String[] args) {
		SpringApplication.run(ExamServerApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// TODO Auto-generated method stub
		//RazorPay_Model m = new RazorPay_Model();
		//System.out.println(key_Id);
		
		//Test Creating user 
		/*
		 * User u = new User(); u.setFirstName("Akash"); u.setLastName("Kumar");
		 * u.setPassword("1234"); u.setEmail("test@gmail.com");
		 * 
		 * //Test Creating Role Role r = new Role(33L, "Admin", null);
		 * 
		 * Set<User_Role> roleSet = new HashSet<User_Role>(); //Test Creating User_Role
		 * User_Role ur = new User_Role(); ur.setRole(r); ur.setUser(u);
		 * 
		 * roleSet.add(ur); User ret = this.userv.createUser(u, roleSet);
		 * System.out.println(ret);
		 */
	}

}
