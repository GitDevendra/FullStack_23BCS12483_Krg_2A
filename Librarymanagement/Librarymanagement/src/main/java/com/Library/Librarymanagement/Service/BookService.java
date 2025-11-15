package com.Library.Librarymanagement.Service;

import com.Library.Librarymanagement.Entity.Books;
import com.Library.Librarymanagement.Entity.Requested;
import com.Library.Librarymanagement.Repo.Booksrepo;
import com.Library.Librarymanagement.Repo.RequestedRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final Booksrepo booksrepo;
    private final RequestedRepo requestedRepo;

    public BookService(Booksrepo booksrepo, RequestedRepo requestedRepo) {
        this.booksrepo = booksrepo;
        this.requestedRepo = requestedRepo;
    }

    // Get all books
    public List<Books> getAllBooks() {
        return booksrepo.findAll();
    }

    // Add a new book
    public String addBook(String bookName) {
        if (booksrepo.existsById(bookName)) {
            return "Book already exists";
        }
        Books book = new Books();
        book.setBook(bookName);
        booksrepo.save(book);
        return "Book added successfully";
    }

    // Request a book (student)
    public String requestBook(String email, String bookName) {
        if (!booksrepo.existsById(bookName)) {
            return "Book not available";
        }
        Requested req = new Requested();
        req.setEmail(email);
        req.setBook(bookName);
        requestedRepo.save(req);
        return "Book request added successfully";
    }
}
