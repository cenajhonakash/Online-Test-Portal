package com.universityTest.Services.Quiz;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.universityTest.DAO.Quiz.Quiz_Repo;
import com.universityTest.Model.Quiz.Quiz;

@Service
public class QuizServiceImpl implements QuizServiceProvider{

	@Autowired
	Quiz_Repo qr;
	
	@Override
	public Quiz addQuiz(Quiz q) {
		return this.qr.save(q);
	}

	@Override
	public Quiz updateQuiz(Quiz q) {
		return this.qr.save(q);
	}

	@Override
	public void deleteQuiz(Long qid) {
		//Quiz q = new Quiz();
		//q.setQid(qid);
		// this.qr.deleteById(qid);		
		 this.qr.deletdQuiz(qid);
	}

	@Override
	public Quiz getQuiz(Long qid) {
		return this.qr.findById(qid).get();
	}

	@Override
	public Set<Quiz> getAllQuiz() {
		return new LinkedHashSet<>(this.qr.findAll());
	}

}
