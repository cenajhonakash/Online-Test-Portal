package com.universityTest.Controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.Principal;
import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.universityTest.Model.Role;
import com.universityTest.Model.User;
import com.universityTest.Model.User_Role;
import com.universityTest.Services.UserServiceImpl;
import com.universityTest.Utility.LoggerUtility;
import com.universityTest.Utility.PasswordUtil;
import com.universityTest.Utility.UserAlreadyPresentException;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:4200")
public class UserController {

	private Logger log = LoggerUtility.getLogger(UserController.class);

	@Autowired
	private UserServiceImpl us;
	@Autowired
	private BCryptPasswordEncoder passEncoder;
	//user creation
//	@PostMapping("/")
//	public User createUser(@RequestBody User u) throws Exception {
//
//		String methodname="createUser()";
//		log.info(methodname+" called");
//
//		u.setEnabled(true);
//		u.setImageURL("default.png");
//		u.setPassword(this.passEncoder.encode(u.getPassword()));
//		Set<User_Role> roleSet = new HashSet<>();
//
//		Role r = new Role();
//		r.setRole("NORMAL");
//		r.setRoleId(2L);
//
//		User_Role ur = new User_Role();
//		ur.setUser(u);
//
//		ur.setRole(r);
//
//		roleSet.add(ur);
//
//		return this.us.createUser(u, roleSet);
//
//	}
	@PostMapping("/")
	public User createUser(@RequestParam("user") String us, @RequestPart("imageURL") MultipartFile imageURL) throws Exception {
		
		String methodname="createUser()";
		log.info(methodname+" called");
		
		User u = new ObjectMapper().readValue(us, User.class);
		//System.out.println(imageURL.getOriginalFilename());
		u.setEnabled(true);
		//u.setImageURL("default.png");
		u.setPassword(this.passEncoder.encode(u.getPassword()));
		if(imageURL.isEmpty()) {
			u.setImageURL("http://127.0.0.1:8887/default.png");
		}else {
			System.out.println(new ClassPathResource("").getFile().getAbsolutePath());
			String fname=u.getPhone()+"-"+imageURL.getOriginalFilename();
			u.setImageURL("http://127.0.0.1:8887/"+u.getPhone()+"-"+imageURL.getOriginalFilename());
			//System.out.println(u.getImageURL());
			String psth="static/Uploaded_IMG/";
			//System.out.println("-----1---");
			Resource save = new ClassPathResource(psth);
			//System.out.println(save.contentLength());
			File file = save.getFile();
			//System.out.println("-----2---");
			Path path = Paths.get(file.getAbsolutePath()+File.separator+fname);
			Files.copy(imageURL.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
			
		Files.move(path, Paths.get("C:\\Users\\akash\\OneDrive\\Desktop\\Jyoti\\ExamServer_uploadedImage\\"+fname));
			
		}
		
		Set<User_Role> roleSet = new HashSet<>();

		Role r = new Role();
		r.setRole("NORMAL");
		r.setRoleId(2L);

		User_Role ur = new User_Role();
		ur.setUser(u);

		ur.setRole(r);

		roleSet.add(ur);

		return this.us.createUser(u, roleSet);

	}

	@GetMapping("/{userName}")
	public User getUser(@PathVariable("userName") String userName) {

		String methodname="getUser()";
		log.info(methodname+" called");

		return this.us.getUser(userName);

	}

	@DeleteMapping("/{userID}")
	public void deleteUser(@PathVariable("userID") Long userID) {

		String methodname="deleteUser()";
		log.info(methodname+" called");

		this.us.deleteUser(userID);		
	}

	@PutMapping("/update/{userID}")
	public ResponseEntity<User> updateUser(@RequestBody User u, @PathVariable("userID") Long userID){	

		String methodname="updateQuiz()";
		log.info(methodname+" called");

		User old = this.us.getUserById(userID);

		if(u.getEmail().trim() !="")
			old.setEmail(u.getEmail());
		if(u.getUserName().trim() !="")
			old.setUserName(u.getUserName());
		if(u.getPhone().trim() !="")
			old.setPhone(u.getPhone());
		if(u.getAbout().trim() !="")
			old.setAbout(u.getAbout());

		return ResponseEntity.ok(this.us.updateUser(old));		
	}
	@PutMapping("/update-Candidate/{userID}")
	public ResponseEntity<User> updateCandidate(@PathVariable("userID") Long userID,Principal p){	

		String methodname="updateCandidate()";
		log.info(methodname+" called");
		System.out.println(p.getName());
		
		User old = this.us.getUserById(userID);
		//System.out.println(u.isEnabled() +" " + old.isEnabled());
		//System.out.println(old.toString());
		System.out.println(old.isEnabled());
		if(old.isEnabled())
			old.setEnabled(false);
		else if(!old.isEnabled())
			old.setEnabled(true);
	//	System.out.println(old.toString());
		System.out.println(old.isEnabled());
		return ResponseEntity.ok(this.us.updateUser(old));		
	}

	@PutMapping("/reset-password/{userID}")
	public ResponseEntity<?> passwordReset(@PathVariable("userID") Long userID, 
			@RequestParam("passChangeModule") String passChangeModule) throws JsonMappingException, JsonProcessingException{	


		String methodname="passwordReset()";
		log.info(methodname+" called");
		
		PasswordUtil ut = new ObjectMapper().readValue(passChangeModule, PasswordUtil.class);
		
		User current = this.us.getUserById(userID);
		
		System.out.println(ut.getNew_pass());
		System.out.println(ut.getRe_entered());
		System.out.println(ut.getOld_pass());
		
		
		if(this.passEncoder.matches(ut.getOld_pass(), current.getPassword())){
			current.setPassword(this.passEncoder.encode(ut.getNew_pass()));
		}else{
			System.out.println("password not changed..");
			return ResponseEntity.ok("Error in changing password");
		}
		return ResponseEntity.ok(this.us.updateUser(current));		
	}

	@GetMapping("/{userID}/getCandidates")
	public ResponseEntity<?> getAllCandidatesForAdmin(@PathVariable("userID") Long userID){

		
		String methodname="getAllCandidatesForAdmin()";
		log.info(methodname+" called");
		
		User u = this.us.getUserById(userID);
		
		for (GrantedAuthority auth : u.getAuthorities()) {
			System.out.print("======="+auth.getAuthority()+"=======");
		}
		for (User_Role r : u.getRoles()) {
			if(r.getRole().getRole().equals("ADMIN") && u.isEnabled())
			{
				return ResponseEntity.ok(this.us.getAllNormalAuthorityUserForAdmin(userID));
			}
		}
		return ResponseEntity.ok("Unautorized access to get CandidateProfile");

	}

	@ExceptionHandler(UserAlreadyPresentException.class)
	public ResponseEntity<?> exceptionHandler(UsernameNotFoundException ex){

		String methodname="exceptionHandler()";
		log.info(methodname+" called");

		return ResponseEntity.status(HttpStatus.IM_USED).body("User is already present!!!");

	}

}
