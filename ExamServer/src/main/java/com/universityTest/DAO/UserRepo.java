package com.universityTest.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import com.universityTest.Model.User;

@Component
public interface UserRepo extends JpaRepository<User, Long>{

	public User findByUserName(String userName);
	
	//public void deleteByuserId(Long userID);
	
	@Query(value = "select * from universitytest_db.user where user.userid in (select user_userid from universitytest_db.user_role where role_role_id in( select role_id from universitytest_db.role where role = 'NORMAL'))", nativeQuery = true)
	public List<User> getAllNormalAuthorityUserForAdmin(Long userId);

}
