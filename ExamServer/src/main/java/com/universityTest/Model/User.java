package com.universityTest.Model;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@Entity
@Table(name = "user")
public class User implements UserDetails{
 
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO) 
	private Long userID;
	private String firstName;
	private String lastName;
	private String password;
	private String email;
	private String phone;
	private String imageURL;
	private String about;
	private String userName;
	private boolean enabled = true;
		
	@Override
	public String toString() {
		return "User [userID=" + userID + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email
				+ ", phone=" + phone + ", imageURL=" + imageURL + ", about=" + about + ", userName=" + userName
				+ ", enabled=" + enabled + ", roles=" + roles + "]";
	}

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "user")
	@JsonIgnore
	private Set<User_Role> roles = new HashSet<>();
	
	public User() {	}

	public Long getUserID() {
		return userID;
	}

	public void setUserID(Long userID) {
		this.userID = userID;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getImageURL() {
		return imageURL;
	}

	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}

	public String getAbout() {
		return about;
	}

	public void setAbout(String about) {
		this.about = about;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Set<User_Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<User_Role> roles) {
		this.roles = roles;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public User(Long userID, String firstName, String lastName, String password, String email, String phone,
			String imageURL, String about, String userName, Set<User_Role> roles, boolean enabled) {
		super();
		this.userID = userID;
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password;
		this.email = email;
		this.phone = phone;
		this.imageURL = imageURL;
		this.about = about;
		this.userName = userName;
		this.roles = roles;
		this.enabled = enabled;
	}

	//@JsonDeserialize(as = Authority.class)
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		Set<Authority> grantedAuth= new HashSet<>();
		this.roles.forEach(roles ->{
			grantedAuth.add(new Authority(roles.getRole().getRole()));
		});
		return grantedAuth;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return userName;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	
}
