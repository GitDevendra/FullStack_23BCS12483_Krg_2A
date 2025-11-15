package com.Library.Librarymanagement.Repo;
import com.Library.Librarymanagement.Entity.Issued;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IssuedRepo extends JpaRepository<Issued,String> {

}
