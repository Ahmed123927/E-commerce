package com.Ecommerce.Ecommerce.model;

import com.Ecommerce.Ecommerce.roles.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data //generate getters & setters
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
/// UserDetails Provides core user information.
//Implementations are not used directly by Spring Security for security purposes.
// They simply store user information which is later encapsulated into Authentication objects.
// This allows non-security related user information (such as email addresses, telephone numbers ) to be stored in a convenient location.
public class User implements UserDetails {
    @Id
    @SequenceGenerator(name="USER_SEQ", sequenceName="users_seq", allocationSize=1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="USER_SEQ")
    private Integer id;


    private String firstname;
    private String lastname;
    private String email;

    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
            return List.of(new SimpleGrantedAuthority(role.name())); //Stores a String representation of an authority granted to the Authentication object.
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
