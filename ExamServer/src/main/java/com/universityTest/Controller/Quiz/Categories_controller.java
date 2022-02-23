package com.universityTest.Controller.Quiz;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

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

import com.universityTest.DAO.Quiz.Category_Repo;
import com.universityTest.Model.Quiz.Category;
import com.universityTest.Model.Quiz.Quiz;
import com.universityTest.Services.Quiz.CaegoryServiceProvider;
import com.universityTest.Utility.LoggerUtility;

@RestController
@RequestMapping("/category")
@CrossOrigin("http://localhost:4200")
public class Categories_controller {

	private Logger log = LoggerUtility.getLogger(Categories_controller.class);
	
	@Autowired
	private CaegoryServiceProvider csv;
	
	@Autowired
	private Category_Repo cr;
	
	@PostMapping("/")
	public ResponseEntity<Category> addCategory(@RequestBody Category c){		
		
		String methodname="addCategory()";
		log.info(methodname+" called");
		
		Category added = this.csv.addCategory(c);
		return ResponseEntity.ok(added);
	}
	
	@GetMapping("/{cid}")
	public ResponseEntity<Category> getCategory(@PathVariable("cid") Long cid){
		
		String methodname="getCategory()";
		log.info(methodname+" called");
		
		return ResponseEntity.ok(this.csv.getCategory(cid));
	}
	
	@GetMapping("/")
	public ResponseEntity<?> getAllCategory(){
		
		String methodname="getAllCategory()";
		log.info(methodname+" called");
		
		return ResponseEntity.ok(this.csv.getAllCategories());
	}
	
	@PutMapping("/")
	public ResponseEntity<Category> updateCategory(@RequestBody Category c){
		
		String methodname="updateCategory()";
		log.info(methodname+" called");
		
		return ResponseEntity.ok(this.csv.updateCategory(c));
	}
	
	@DeleteMapping("/{cid}")
	public void deleteCategory(@PathVariable("cid") Long cid){
		
		String methodname="deleteCategory()";
		log.info(methodname+" called");
		
		this.csv.deleteCategory(cid);
	}
	
	@GetMapping("/fetch-quiz/{cid}")
	public ResponseEntity<List<Quiz>> getQuizzesOfCategory(@PathVariable("cid") Long cid){
		
		String methodname="getQuizzesOfCategory()";
		log.info(methodname+" called");
		
		Category c = this.csv.getCategory(cid);
		Set<Quiz> quizSet = c.getQuizzes();
		
		List<Quiz> quizList = new ArrayList<Quiz>(quizSet);
		
		return ResponseEntity.ok(quizList);
	}
	
	@GetMapping("/search/{query}")
	public ResponseEntity<?> searchController(@PathVariable("query") String query){
		System.out.println("Query for search = "+query);
		List<Category> list = this.cr.findByNameContainingAndCategory(query);
		return ResponseEntity.ok(list);
	}
}
