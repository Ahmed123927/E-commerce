package com.Ecommerce.Ecommerce.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.security.core.GrantedAuthority;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class JwtService {
    private static final String SECRET_KEY="31f6de8a20e1e206a77e6f6ec319353520e8f2c8f8f428841c8707ef3b32776e";
    private static final long ACCESS_TOKEN_VALIDITY_SECONDS = 86400; // 24 hours


    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        Date currentTime = new Date();
        Date expirationTime = new Date(currentTime.getTime() + ACCESS_TOKEN_VALIDITY_SECONDS * 1000); // 24 hours from now

        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(currentTime)
                .setExpiration(expirationTime)
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }


    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()));
        return generateToken(claims, userDetails);
    }    public String extractUsername(String token) {
        return extractClaim(token,Claims::getSubject);
    }
    public <T> T extractClaim(String token, Function<Claims,T> claimsTResolver){
        final Claims claims=extractAllClaims(token);
        return  claimsTResolver.apply(claims);
    }
    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean isTokenValid(String token,UserDetails userDetails){
        final String username=extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        Date expiration = extractExpiration(token);
        Date now = new Date();
        long allowedClockSkewMillis = 1000; // 1 second tolerance
        return expiration.before(new Date(now.getTime() + allowedClockSkewMillis));
    }
    private Date extractExpiration(String token) {
        return extractClaim(token,Claims::getExpiration);
    }

    private Key getSignKey() {
        byte[] keyBytes= Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
