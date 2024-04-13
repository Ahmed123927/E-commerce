package com.Ecommerce.Ecommerce.service;

import com.Ecommerce.Ecommerce.model.Category;
import com.Ecommerce.Ecommerce.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final CategoryRepository categoryRepository;


    public void add(Category category){
        categoryRepository.save(category);
    }
    public void delete(int id){categoryRepository.deleteById(id);}

    public void update(int id, Category newCategory) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);

        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();

            category.setCategoryName(newCategory.getCategoryName());
            category.setParentCategory(newCategory.getParentCategory());

            categoryRepository.save(category);
        } else {
            throw new RuntimeException("Category Not Found with id: " + id);
        }
    }

    public List<Category> getAllCategory(){
        return categoryRepository.findAll();
    }
}
