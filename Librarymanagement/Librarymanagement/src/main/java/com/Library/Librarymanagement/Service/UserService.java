package com.Library.Librarymanagement.Service;

import com.Library.Librarymanagement.Entity.Users;
import com.Library.Librarymanagement.Repo.Usersrepo;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final Usersrepo usersrepo;

    public UserService(Usersrepo usersrepo) {
        this.usersrepo = usersrepo;
    }

    // LOGIN
    public String loginUser(String email, String password) {
        Users user = usersrepo.findById(email).orElse(null);
        if (user == null) {
            return "User not found";
        }
        if (!user.getPassword().equals(password)) {
            return "Invalid password";
        }
        return user.getUsertype(); // "admin" or "student"
    }

    // SIGNUP
    public String signupUser(String email, String password, String usertype) {
        if (usersrepo.existsById(email)) {
            return "Account already exists";
        }
        Users newUser = new Users();
        newUser.setEmail(email);
        newUser.setPassword(password);
        newUser.setUsertype(usertype);
        usersrepo.save(newUser);
        return "Account created successfully";
    }
}
