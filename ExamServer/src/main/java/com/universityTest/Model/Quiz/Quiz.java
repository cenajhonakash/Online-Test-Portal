package com.universityTest.Model.Quiz;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "quiz")
public class Quiz {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long qid;
	//private Long cid;
	private boolean active;
	private String title;
	private String about;
	private String max_marks;
	private String no_of_questions;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Category category;

	@OneToMany(mappedBy = "quiz", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<Questions> quest = new HashSet<>();
	
	public Long getQid() {
		return qid;
	}

	public void setQid(Long qid) {
		this.qid = qid;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAbout() {
		return about;
	}

	public void setAbout(String about) {
		this.about = about;
	}

	public String getMax_marks() {
		return max_marks;
	}

	public void setMax_marks(String max_marks) {
		this.max_marks = max_marks;
	}

	public String getNo_of_questions() {
		return no_of_questions;
	}

	public void setNo_of_questions(String no_of_questions) {
		this.no_of_questions = no_of_questions;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Set<Questions> getQuest() {
		return quest;
	}

	public void setQuest(Set<Questions> quest) {
		this.quest = quest;
	}

	public Quiz() {}
	
	
}
