package com.universityTest.Services;

import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.universityTest.Model.User;
import com.universityTest.Model.User_Role;

@Service
public interface UserServiceProvider {

	//creating User
	public User createUser(User u, Set<User_Role> userRoles) throws Exception;
	
	public User getUser(String userName);
	
	public void deleteUser(Long userID);
	
	//public User updateUser(Long userId);
	
	public User updateUser(User u);
	
	public User getUserById(Long userID);
	
	//public List<User> getAllNormalUser();
	public List<User> getAllNormalAuthorityUserForAdmin(Long userId);
}
