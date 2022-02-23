package com.universityTest.Model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "role")
public class Role {

	@Id
	private long roleId;
	private String role;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "role")
	@JsonIgnore
	private Set<User_Role> roles = new HashSet<>();

	//Getter-Setter
	
	public long getRoleId() {
		return roleId;
	}

	public void setRoleId(long roleId) {
		this.roleId = roleId;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Set<User_Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<User_Role> roles) {
		this.roles = roles;
	}

	public Role(long roleId, String role, Set<User_Role> roles) {
		super();
		this.roleId = roleId;
		this.role = role;
		this.roles = roles;
	}

	public Role() {}
	
	
}
