package com.universityTest.Utility;

public class PasswordUtil {

	String old_pass;
	String new_pass;
	String re_entered;
	
	public PasswordUtil(String old_pass, String new_pass, String re_entered) {
		super();
		this.old_pass = old_pass;
		this.new_pass = new_pass;
		this.re_entered = re_entered;
	}
	public PasswordUtil() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getOld_pass() {
		return old_pass;
	}
//	public void setOld_pass(String old_pass) {
//		this.old_pass = old_pass;
//	}
	public String getNew_pass() {
		return new_pass;
	}
//	public void setNew_pass(String new_pass) {
//		this.new_pass = new_pass;
//	}
	public String getRe_entered() {
		return re_entered;
	}
//	public void setRe_entered(String re_entered) {
//		this.re_entered = re_entered;
//	}
	@Override
	public String toString() {
		return "PasswordUtil [old_pass=" + old_pass + ", new_pass=" + new_pass + ", re_entered=" + re_entered + "]";
	}
	
	
}
