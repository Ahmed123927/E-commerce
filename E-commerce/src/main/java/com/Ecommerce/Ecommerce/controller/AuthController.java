package com.Ecommerce.Ecommerce.controller;

import com.Ecommerce.Ecommerce.dto.AuthenticationRequest;
import com.Ecommerce.Ecommerce.dto.AuthenticationResponse;
import com.Ecommerce.Ecommerce.dto.RegisterRequest;
import com.Ecommerce.Ecommerce.model.User;
import com.Ecommerce.Ecommerce.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")

@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationService authenticationService;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request){

        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request){

        return ResponseEntity.ok(authenticationService.login(request));

    }
    @GetMapping("/get-user-session")
    public User testSession() {
        User user = authenticationService.getUserFromSession();

        if (user != null) {
            // Print user details
            System.out.println("User from session: " + user.toString());
            return user;
        }
        return null;
    }


}
