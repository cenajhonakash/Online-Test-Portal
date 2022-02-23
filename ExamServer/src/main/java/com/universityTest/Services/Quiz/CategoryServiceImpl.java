package com.universityTest.Services.Quiz;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.universityTest.DAO.Quiz.Category_Repo;
import com.universityTest.Model.Quiz.Category;
import com.universityTest.Model.Quiz.Quiz;

@Service
public class CategoryServiceImpl implements CaegoryServiceProvider{

	@Autowired
	Category_Repo cr;
	
	@Override
	public Category addCategory(Category c) {
		return this.cr.save(c);
	}

	@Override
	public Category updateCategory(Category c) {
		return this.cr.save(c);
	}

	@Override
	public Category getCategory(Long cid) {
		return this.cr.findById(cid).get();
	}

	@Override
	public void deleteCategory(Long cid) {
		this.cr.deleteById(cid);
	}

	@Override
	public Set<Category> getAllCategories() {
		return new LinkedHashSet<>(this.cr.findAll());
	}


}
