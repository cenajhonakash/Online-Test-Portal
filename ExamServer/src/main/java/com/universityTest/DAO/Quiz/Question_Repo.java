package com.universityTest.DAO.Quiz;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.universityTest.Model.Quiz.Questions;
import com.universityTest.Model.Quiz.Quiz;

public interface Question_Repo extends JpaRepository<Questions, Long>{

	Set<Questions> findQuestionsByQuiz(Quiz q);

	 @Query(value = "SELECT * FROM questio WHERE content like %:keyword%", nativeQuery = true)
	 List<Questions> findByNameContainingAndQuestion(String keyword);
}
