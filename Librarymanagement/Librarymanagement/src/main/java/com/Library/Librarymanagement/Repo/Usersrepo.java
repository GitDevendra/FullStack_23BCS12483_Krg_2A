package com.Library.Librarymanagement.Repo;

import com.Library.Librarymanagement.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Usersrepo extends JpaRepository<Users,String> {
}
