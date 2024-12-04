package com.stublab.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/add")
public class StubController {

    @GetMapping("/user")
    public Map<String, String> getUser() {
        Map<String, String> user = new HashMap<>();
        user.put("firstName", "abc");
        user.put("lastName", "xyz");
        user.put("email", "ssm@gmail.com");
        user.put("phoneNum", "123456789");
        return user;
    }

    @PostMapping("/user")
    public ResponseEntity<String> createUser(@RequestBody Map<String, Object> userData) {
        return ResponseEntity.ok("User created: " + userData);
    }
}

