package com.Library.Librarymanagement.Controllers;

import com.Library.Librarymanagement.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestHeader String email, @RequestHeader String password) {
        String result = userService.loginUser(email, password);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signupUser(@RequestHeader String email, @RequestHeader String password, @RequestHeader String usertype) {
        String result = userService.signupUser(email, password, usertype);
        return ResponseEntity.ok(result);
    }
}
