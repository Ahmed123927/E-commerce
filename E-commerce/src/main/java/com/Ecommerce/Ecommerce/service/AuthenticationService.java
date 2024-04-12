package com.Ecommerce.Ecommerce.service;

import com.Ecommerce.Ecommerce.auth.AuthenticationRequest;
import com.Ecommerce.Ecommerce.auth.AuthenticationResponse;
import com.Ecommerce.Ecommerce.auth.RegisterRequest;
import com.Ecommerce.Ecommerce.config.JwtService;
import com.Ecommerce.Ecommerce.user.Role;
import com.Ecommerce.Ecommerce.user.User;
import com.Ecommerce.Ecommerce.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {

        User user= User.builder().
                firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.valueOf(request.getRole())).build();

        repository.save(user);

        return AuthenticationResponse.builder().token(jwtService.generateToken(user)).build();

    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));

        User user=repository.findByEmail(request.getEmail()).orElseThrow();
        return AuthenticationResponse.builder().token(jwtService.generateToken(user)).build();
    }
}
