package com.universityTest.Services;

import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.universityTest.DAO.Role_Repo;
import com.universityTest.DAO.UserRepo;
import com.universityTest.Model.User;
import com.universityTest.Model.User_Role;
import com.universityTest.Utility.LoggerUtility;
import com.universityTest.Utility.UserAlreadyPresentException;

@Service
public class UserServiceImpl implements UserServiceProvider{

	
	private Logger log = LoggerUtility.getLogger(UserServiceImpl.class);
	
	@Autowired
	UserRepo ur;
	@Autowired
	Role_Repo rr;

	// User creation
	@Override
	public User createUser(User u, Set<User_Role> userRoles) throws Exception {

		String methodname="createUser()";
		log.info(methodname+" called");

		User existing = this.ur.findByUserName(u.getUserName());
		if(existing!=null) {
			System.out.println("User is already present!!!");
			throw new UserAlreadyPresentException();
		}else {
			for (User_Role user_Role : userRoles) {
				rr.save(user_Role.getRole()); 

			}
			u.getRoles().addAll(userRoles);
			existing = this.ur.save(u);
		}
		return existing;
	}

	@Override
	public User getUser(String userName) {
		
		String methodname="getUser()";
		log.info(methodname+" called");
		// TODO Auto-generated method stub
		return this.ur.findByUserName(userName);
	}

	@Override
	public void deleteUser(Long userID) {
		
		String methodname="deleteUser()";
		log.info(methodname+" called");
		
		this.ur.deleteById(userID);		
	}

	@Override
	public User updateUser(User u) {
		
		String methodname="updateUser()";
		log.info(methodname+" called");
		// TODO Auto-generated method stub
		return this.ur.save(u);
	}

	@Override
	public User getUserById(Long userID) {
		String methodname="getUserById()";
		log.info(methodname+" called");
		return this.ur.findById(userID).get();
	}

	@Override
	public List<User> getAllNormalAuthorityUserForAdmin(Long userId) {
		// TODO Auto-generated method stub
		return this.ur.getAllNormalAuthorityUserForAdmin(userId);
	}

}
