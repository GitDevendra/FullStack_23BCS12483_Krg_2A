package com.Library.Librarymanagement.Repo;

import com.Library.Librarymanagement.Entity.Requested;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestedRepo extends JpaRepository<Requested,String> {

}
