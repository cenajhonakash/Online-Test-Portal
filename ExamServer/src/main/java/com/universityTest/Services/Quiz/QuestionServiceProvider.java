package com.universityTest.Services.Quiz;

import java.util.Set;

import com.universityTest.Model.Quiz.Questions;
import com.universityTest.Model.Quiz.Quiz;

public interface QuestionServiceProvider {
	
	public Questions addQuestions(Questions ques);
	public Questions updateQuestions(Questions ques);
	public Questions getQuestions(Long quesId);
	public void deleteQuestions(Long quesId);
	public Set<Questions> getAllQuestions();
	public Set<Questions> getQuestionsOfQuiz(Quiz q);
	
}
