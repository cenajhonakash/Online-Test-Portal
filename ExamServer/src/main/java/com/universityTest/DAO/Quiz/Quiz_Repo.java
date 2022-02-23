package com.universityTest.DAO.Quiz;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.universityTest.Model.Quiz.Quiz;

@Repository
public interface Quiz_Repo extends JpaRepository<Quiz, Long>{

	@Modifying
    @Transactional
	@Query(value = "DELETE FROM quiz WHERE qid = ?1", nativeQuery = true)
	public void deletdQuiz(Long qid);

	 @Query(value = "SELECT * FROM quiz WHERE title like %:keyword%", nativeQuery = true)
	 List<Quiz> findByNameContainingAndQuiz(String keyword);
}
