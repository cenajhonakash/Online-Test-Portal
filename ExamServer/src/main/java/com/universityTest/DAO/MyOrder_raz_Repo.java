package com.universityTest.DAO;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.universityTest.Payment.Payment_Order;

@Repository
public interface MyOrder_raz_Repo extends JpaRepository<Payment_Order, Long>{

	public Payment_Order findByRazorOID(String razorOID);
	
	@Query(value = "SELECT * FROM razor_order WHERE userID = ?1", nativeQuery = true)
	public List<Payment_Order> findAllPayment_OrderOfUser(Long userID);
	
}
