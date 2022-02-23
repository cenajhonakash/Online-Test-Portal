package com.universityTest.Payment;

import java.security.Principal;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.razorpay.*;
import com.universityTest.DAO.MyOrder_raz_Repo;
import com.universityTest.DAO.UserRepo;
import com.universityTest.Utility.LoggerUtility;

@RestController
@RequestMapping("/razorPay-gateway")
@CrossOrigin("*")
public class RazorPay_Controller {

	@Value("{${RazorPay_Model.key_Id}}")
	String key_Id;
	@Value("{${RazorPay_Model.secret_key}}")
	String secret_key;

	private Logger log = LoggerUtility.getLogger(RazorPay_Controller.class);

	@Autowired
	MyOrder_raz_Repo oR;

	@Autowired
	UserRepo ur;
	@Autowired
	MyOrder_raz_Repo payrepo;

	@PostMapping("/create-order")
	public String createOrder(@RequestBody Map<String, Object> data, Principal p) throws RazorpayException{

		String methodname="createOrder()";
		log.info(methodname+" called");

		//System.out.println(key_Id+"\nPayment Requested\n"+secret_key);
		//data.forEach((k,v)->{System.out.println(k+" - "+v);});
		Random r = new Random(1000000);
		var client = new RazorpayClient(key_Id.substring(1, key_Id.length()-1),secret_key.substring(1, secret_key.length()-1));

		JSONObject obj = new JSONObject();
		obj.put("amount", Integer.parseInt(data.get("money").toString())*100);
		obj.put("currency", "INR");
		obj.put("receipt", ("txn_"+r.nextInt()+"_"+java.time.LocalDate.now()));
		Order order = client.Orders.create(obj);

		Payment_Order myOrder = new Payment_Order();
		myOrder.setAmount(data.get("money").toString());
		myOrder.setReceipt(order.get("receipt"));
		myOrder.setOrder_date((new Timestamp(System.currentTimeMillis())).toString());
		myOrder.setRazorOID(order.get("id"));
		myOrder.setStatus("created");
		myOrder.setUser(this.ur.findByUserName(p.getName()));

		this.payrepo.save(myOrder);

		System.out.println(order.toString());

		return order.toString();

	}

	@PutMapping("/update-order")
	public ResponseEntity<?> updateOrder(@RequestBody Map<String, Object> data, Principal p) {

		System.out.println(data);
		String methodname="updateOrder()";
		log.info(methodname+" called");

		Payment_Order py = this.payrepo.findByRazorOID(data.get("razorpay_order_id").toString());

		py.setPaymentID(data.get("razorpay_payment_id").toString());
		py.setStatus(data.get("status").toString());

		this.oR.save(py);
		return ResponseEntity.ok(Map.of("message","Order status for "+data.get("razorpay_payment_id").toString()+"updated successfully"));

	}

	@GetMapping("/getPaymentDetails/{userID}")
	public List<Payment_Order> getAllAttemptedPayments(@PathVariable Long userID, Principal p){

		String methodname="getAllAttemptedPayments()";
		log.info(methodname+" called");
		System.out.println(p.getName().toString());
		if(p.getName().equals(this.ur.getById(userID).getUserName())) {
			List<Payment_Order> list = this.payrepo.findAllPayment_OrderOfUser(userID);
			return list;
		}else {
			System.out.println("Unauthorized!!!!!!!!!!....URL Hit and trial!!!");
			
		}
		return null;

	}
}
