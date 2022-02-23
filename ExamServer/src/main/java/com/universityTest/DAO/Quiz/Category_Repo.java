package com.universityTest.DAO.Quiz;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.universityTest.Model.Quiz.Category;

public interface Category_Repo extends JpaRepository<Category, Long>{

	  @Query(value = "SELECT * FROM category WHERE title like %:keyword%", nativeQuery = true)
	 List<Category> findByNameContainingAndCategory(String keyword);
}
