package com.universityTest.Services.Quiz;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.universityTest.DAO.Quiz.Question_Repo;
import com.universityTest.Model.Quiz.Questions;
import com.universityTest.Model.Quiz.Quiz;

@Service
public class QuestionsServiceImpl implements QuestionServiceProvider{

	@Autowired
	Question_Repo qr;
	
	@Override
	public Questions addQuestions(Questions ques) {
		return this.qr.save(ques);
	}

	@Override
	public Questions updateQuestions(Questions ques) {
		return this.qr.save(ques);
	}

	@Override
	public Questions getQuestions(Long quesId) {
		return this.qr.findById(quesId).get();
	}

	@Override
	public void deleteQuestions(Long quesId) {
		this.qr.deleteById(quesId);
	}

	@Override
	public Set<Questions> getAllQuestions() {
		return new LinkedHashSet<>(this.qr.findAll());
	}

	@Override
	public Set<Questions> getQuestionsOfQuiz(Quiz q) {
		return this.qr.findQuestionsByQuiz(q);
	}

}
