package com.Ecommerce.Ecommerce.service;

import com.Ecommerce.Ecommerce.dto.ProductDTO;
import com.Ecommerce.Ecommerce.model.Category;
import com.Ecommerce.Ecommerce.model.Product;
import com.Ecommerce.Ecommerce.repository.CategoryRepository;
import com.Ecommerce.Ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BuyerService {
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public List<Category> getAllCategories(){
        return categoryRepository.findAll();
    }
    public List<Category> getAllParentCategories(){
        return categoryRepository.findCategoriesByParentCategoryEmpty();
    }

    public List<ProductDTO> getAllProducts(){
        List<Product> products = productRepository.findAll();
        return products.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public List<ProductDTO> getAllProductsByCategoryId(int id){
        List<Product> products =productRepository.findByCategoryId(id);
        return products.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public ProductDTO convertToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setProductName(product.getProductName());
        dto.setPrice(product.getPrice());
        dto.setQuantity(product.getQuantity());
        dto.setDescription(product.getDescription());
        dto.setRate(product.getRate());
        dto.setImages(product.getImages());
        dto.setCategory(product.getCategory());


        if (product.getUser() != null) {
            dto.setOwnerFirstName(product.getUser().getFirstname());
            dto.setOwnerLastName(product.getUser().getLastname());
        } else {

            dto.setOwnerFirstName("Unknown");
            dto.setOwnerLastName("Unknown");
        }


        return dto;
    }
}
