package com.universityTest.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import com.universityTest.Model.Role;

@Component
public interface Role_Repo  extends JpaRepository<Role, Long>{

}
