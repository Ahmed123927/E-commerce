package com.Ecommerce.Ecommerce.repository;

import com.Ecommerce.Ecommerce.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Integer> {
}
