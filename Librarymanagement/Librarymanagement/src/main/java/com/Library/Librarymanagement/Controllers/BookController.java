package com.Library.Librarymanagement.Controllers;

import com.Library.Librarymanagement.Entity.Books;
import com.Library.Librarymanagement.Service.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/book")
public class BookController {

    private final BookService bookService;
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Books>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @PostMapping("/add")
    public ResponseEntity<String> addBook(@RequestHeader String book) {
        return ResponseEntity.ok(bookService.addBook(book));
    }

    @PostMapping("/request")
    public ResponseEntity<String> requestBook(@RequestHeader String email, @RequestHeader String book) {
        return ResponseEntity.ok(bookService.requestBook(email, book));
    }
}
