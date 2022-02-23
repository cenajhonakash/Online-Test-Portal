package com.universityTest.Services.Quiz;

import java.util.Set;

import com.universityTest.Model.Quiz.Category;
import com.universityTest.Model.Quiz.Quiz;

public interface CaegoryServiceProvider {

	public Category addCategory(Category c);
	public Category updateCategory(Category c);
	public Category getCategory(Long cid);
	public void deleteCategory(Long cid);
	public Set<Category> getAllCategories();
	//public Set<Quiz> getQuizOfCategody(Long cid);
	
}
