package com.universityTest.Services.Quiz;

import java.util.Set;

import com.universityTest.Model.Quiz.Quiz;

public interface QuizServiceProvider {

	public Quiz addQuiz(Quiz c);
	public Quiz updateQuiz(Quiz c);
	public void deleteQuiz(Long qid);
	public Quiz getQuiz(Long qid);
	public Set<Quiz> getAllQuiz();
}
