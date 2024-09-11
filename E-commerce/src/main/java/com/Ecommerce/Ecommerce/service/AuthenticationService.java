package com.Ecommerce.Ecommerce.service;

import com.Ecommerce.Ecommerce.dto.AuthenticationRequest;
import com.Ecommerce.Ecommerce.dto.AuthenticationResponse;
import com.Ecommerce.Ecommerce.dto.RegisterRequest;
import com.Ecommerce.Ecommerce.encryption.AES;
import com.Ecommerce.Ecommerce.model.User;
import com.Ecommerce.Ecommerce.repository.UserRepository;
import com.Ecommerce.Ecommerce.roles.Role;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.jasypt.encryption.StringEncryptor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final HttpServletRequest requestHttp;
    private final StringEncryptor encryptor;
    public AuthenticationResponse register(RegisterRequest request) {

        User user= User.builder().
                firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(AES.encrypt(request.getEmail()))
                .password(passwordEncoder.encode(request.getPassword())) //haaaaaaasshing
                .role(Role.valueOf(request.getRole())).build();

        repository.save(user);

        return AuthenticationResponse.builder().token(jwtService.generateToken(user)).build();

    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        String encryptedEmail = AES.encrypt(request.getEmail());

        System.out.println(encryptedEmail);
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(encryptedEmail, request.getPassword()));

        User user = repository.findByEmail(encryptedEmail).orElseThrow(() -> new NoSuchElementException("User not found"));
        String token = jwtService.generateToken(user);

        HttpSession session = requestHttp.getSession(true);
        session.setAttribute("jwt", token);

        return AuthenticationResponse.builder().token(jwtService.generateToken(user)).build();
    }

    public void logout() {
        // Invalidate session on logout
        HttpSession session = requestHttp.getSession(false);
        if (session != null) {
            session.invalidate();
        }
    }
        public  User getUserFromSession() {
        HttpSession session = requestHttp.getSession(false);
        if (session != null) {
            return (User) session.getAttribute("user");
        }
        return null;
    }
}
