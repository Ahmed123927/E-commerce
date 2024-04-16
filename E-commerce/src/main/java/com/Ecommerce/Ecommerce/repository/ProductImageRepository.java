package com.Ecommerce.Ecommerce.repository;

import com.Ecommerce.Ecommerce.model.ProductImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductImageRepository extends JpaRepository<ProductImage,Integer> {
    ProductImage findByProductId(Integer product_id);
    void deleteAllByProductId(int id);
}
