package com.universityTest.Model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "user_role")
public class User_Role {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO) 
	private long user_Role_ID;

	@ManyToOne
	private Role role;

	@ManyToOne(fetch = FetchType.LAZY)
	private User user;

	//Getter-Setter
	
	public long getUser_Role_ID() {
		return user_Role_ID;
	}

	public void setUser_Role_ID(long user_Role_ID) {
		this.user_Role_ID = user_Role_ID;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public User_Role(long user_Role_ID, Role role, User user) {
		super();
		this.user_Role_ID = user_Role_ID;
		this.role = role;
		this.user = user;
	}

	public User_Role() {
	}


}
