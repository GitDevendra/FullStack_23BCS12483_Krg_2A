package com.Library.Librarymanagement.Service;

import com.Library.Librarymanagement.Entity.Issued;
import com.Library.Librarymanagement.Entity.Requested;
import com.Library.Librarymanagement.Repo.IssuedRepo;
import com.Library.Librarymanagement.Repo.RequestedRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final IssuedRepo issuedRepo;
    private final RequestedRepo requestedRepo;

    public AdminService(IssuedRepo issuedRepo, RequestedRepo requestedRepo) {
        this.issuedRepo = issuedRepo;
        this.requestedRepo = requestedRepo;
    }

    // Issue book
    public String issueBook(String email, String book) {
        Requested req = requestedRepo.findById(email).orElse(null);
        if (req == null || !req.getBook().equals(book)) {
            return "Request not found for given email/book";
        }

        Issued issued = new Issued();
        issued.setEmail(email);
        issued.setBook(book);
        issuedRepo.save(issued);

        requestedRepo.deleteById(email);

        return "Book issued successfully";
    }

    // Get all issued
    public List<Issued> getAllIssued() {
        return issuedRepo.findAll();
    }

    // Get issued by email
    public List<Issued> getIssuedByEmail(String email) {
        return issuedRepo.findAll().stream()
                .filter(i -> i.getEmail().equals(email))
                .toList();
    }
}
