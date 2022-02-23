package com.universityTest.Controller.Quiz;

import java.util.List;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.universityTest.DAO.Quiz.Quiz_Repo;
import com.universityTest.Model.Quiz.Category;
import com.universityTest.Model.Quiz.Quiz;
import com.universityTest.Services.Quiz.CaegoryServiceProvider;
import com.universityTest.Services.Quiz.QuizServiceProvider;
import com.universityTest.Utility.LoggerUtility;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("http://localhost:4200")
public class Quiz_controller {
	
	private Logger log = LoggerUtility.getLogger(Quiz_controller.class);
	
	@Autowired
	QuizServiceProvider qsp;
	
	@Autowired
	Quiz_Repo qr;
	
	@PostMapping("/")
	public ResponseEntity<Quiz> addQuiz(@RequestBody Quiz q){

		String methodname="addQuiz()";
		log.info(methodname+" called");
		
		return ResponseEntity.ok(this.qsp.addQuiz(q));		
	}
	
	@PutMapping("/")
	public ResponseEntity<Quiz> updateQuiz(@RequestBody Quiz q){	
		
		String methodname="updateQuiz()";
		log.info(methodname+" called");
		
		return ResponseEntity.ok(this.qsp.updateQuiz(q));		
	}
	
	@GetMapping("/")
	public ResponseEntity<?> getAllQuiz(){	
		
		String methodname="getAllQuiz()";
		log.info(methodname+" called");
		
		return ResponseEntity.ok(this.qsp.getAllQuiz());		
	}
	
	@GetMapping("/{qid}")
	public ResponseEntity<?> getQuiz(@PathVariable("qid") Long qid){	
		
		String methodname="getQuiz()";
		log.info(methodname+" called");
		
		return ResponseEntity.ok(this.qsp.getQuiz(qid));		
	}
	
	@DeleteMapping("/{qid}")
	public void deleteQuiz(@PathVariable("qid") Long qid){	
		
		String methodname="deleteQuiz()";
		log.info(methodname+" called");
		
	//	System.out.println("qid = " + qid);
		this.qsp.deleteQuiz(qid);		
	}
	
	@GetMapping("/search/{query}")
	public ResponseEntity<?> searchController(@PathVariable("query") String query){
		System.out.println("Query for search = "+query);
		List<Quiz> list = this.qr.findByNameContainingAndQuiz(query);
		return ResponseEntity.ok(list);
	}
}
