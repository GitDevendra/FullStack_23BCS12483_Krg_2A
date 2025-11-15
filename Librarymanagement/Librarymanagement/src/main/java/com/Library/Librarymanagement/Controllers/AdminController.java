package com.Library.Librarymanagement.Controllers;

import com.Library.Librarymanagement.Entity.Issued;
import com.Library.Librarymanagement.Service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/issue")
    public ResponseEntity<String> issueBook(@RequestHeader String email, @RequestHeader String book) {
        return ResponseEntity.ok(adminService.issueBook(email, book));
    }

    @GetMapping("/issued/all")
    public ResponseEntity<List<Issued>> getAllIssued() {
        return ResponseEntity.ok(adminService.getAllIssued());
    }

    @GetMapping("/issued/byemail")
    public ResponseEntity<List<Issued>> getIssuedByEmail(@RequestHeader String email) {
        return ResponseEntity.ok(adminService.getIssuedByEmail(email));
    }
}
