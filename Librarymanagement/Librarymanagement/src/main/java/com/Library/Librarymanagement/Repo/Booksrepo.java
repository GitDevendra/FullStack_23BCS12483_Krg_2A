package com.Library.Librarymanagement.Repo;

import com.Library.Librarymanagement.Entity.Books;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Booksrepo extends JpaRepository<Books,String> {

}
