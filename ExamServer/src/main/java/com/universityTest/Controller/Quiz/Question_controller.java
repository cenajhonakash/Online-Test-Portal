package com.universityTest.Controller.Quiz;

import java.util.ArrayList;
import java.util.Collections;
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

import com.universityTest.Model.Quiz.Questions;
import com.universityTest.Model.Quiz.Quiz;
import com.universityTest.Services.Quiz.QuestionServiceProvider;
import com.universityTest.Services.Quiz.QuizServiceProvider;
import com.universityTest.Utility.LoggerUtility;

@RestController
@RequestMapping("/question")
@CrossOrigin("http://localhost:4200")
public class Question_controller {

	private Logger log = LoggerUtility.getLogger(Question_controller.class);
	
	@Autowired
	private QuestionServiceProvider quesp;
	
	@Autowired
	private QuizServiceProvider qsp;
	
	@PostMapping("/")
	public ResponseEntity<Questions> addQuestion(@RequestBody Questions q){
		
		String methodname="addQuestion()";
		log.info(methodname+" called");
		
		return ResponseEntity.ok(this.quesp.addQuestions(q));
	}
	 
	@PutMapping("/")
	public ResponseEntity<Questions> updateQuestion(@RequestBody Questions q){
		
		String methodname="updateQuestion()";
		log.info(methodname+" called");
		
		return ResponseEntity.ok(this.quesp.updateQuestions(q));
	}
	
	@GetMapping("/")
	public ResponseEntity<?> getAllQuestion(){
		
		String methodname="getAllQuestion()";
		log.info(methodname+" called");
		
		return ResponseEntity.ok(this.quesp.getAllQuestions());
	}
	
	@GetMapping("/{quesId}")
	public ResponseEntity<?> getQuestionFromID(@PathVariable("quesId") Long quesId){
		
		String methodname="getQuestionFromID()";
		log.info(methodname+" called");
		
		return ResponseEntity.ok(this.quesp.getQuestions(quesId));
	}
	
	@GetMapping("/quiz/{qid}")
	public ResponseEntity<?> getAllQuestionOfQuiz(@PathVariable("qid") Long qid){
		
		String methodname="getAllQuestionOfQuiz()";
		log.info(methodname+" called");
		
		// scenario : if inside quiz we have questions > no_of_questions, then we have to show only max question no
		Quiz q = this.qsp.getQuiz(qid);
		Set<Questions> totalQues =q.getQuest();
		// due to memory constraint we are converting set into list + we don't want to use contains() method frequently
		List<Questions> toQs = new ArrayList<Questions>(totalQues);
		if(toQs.size()>Integer.parseInt(q.getNo_of_questions()))
			toQs=toQs.subList(0, Integer.parseInt(q.getNo_of_questions())+1);
		
		Collections.shuffle(toQs);
		
		return ResponseEntity.ok(toQs);
	}
	
	@GetMapping("/quiz/admin-all/{qid}")
	public ResponseEntity<?> getAllQuestionOfQuiz4Admin(@PathVariable("qid") Long qid){
		
		String methodname="getAllQuestionOfQuiz4Admin()";
		log.info(methodname+" called");
		
		// scenario : if inside quiz we have questions > no_of_questions, then we have to show only max question no
		Quiz q = this.qsp.getQuiz(qid);
		Set<Questions> totalQues =q.getQuest();
		// due to memory constraint we are converting set into list + we don't want to use contains() method frequently
		List<Questions> toQs = new ArrayList<Questions>(totalQues);
		
		//Collections.shuffle(toQs);
		
		return ResponseEntity.ok(toQs);
	}
	@DeleteMapping("/{quesId}")
	public void  DeleteQuestionsById(@PathVariable("quesId") Long quesId) {
		
		String methodname="DeleteQuestionsById()";
		log.info(methodname+" called");
		
		this.quesp.deleteQuestions(quesId);
	}
	
}
