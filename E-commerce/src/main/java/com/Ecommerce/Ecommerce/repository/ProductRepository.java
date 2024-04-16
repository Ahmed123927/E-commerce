package com.Ecommerce.Ecommerce.repository;

import com.Ecommerce.Ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Integer> {
    List<Product> findByCategoryId(Integer category_id);
    List<Product> findByCategoryIdAndUserId(Integer catId,Integer userId);
    List<Product> findByUserId(Integer id);
}
