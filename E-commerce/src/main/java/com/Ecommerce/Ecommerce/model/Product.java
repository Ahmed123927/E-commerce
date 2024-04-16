package com.Ecommerce.Ecommerce.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.proxy.HibernateProxy;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String productName;
    private double price;
    private int quantity;
    private String description;
    private float rate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id" )
    private Category category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference
    private List<ProductImage> images;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "user_id")
    private User user;

    public User getUser() {
        if (user instanceof HibernateProxy) {
            user = (User) ((HibernateProxy) user).getHibernateLazyInitializer()
                    .getImplementation();
        }
        return user;
    }
}
