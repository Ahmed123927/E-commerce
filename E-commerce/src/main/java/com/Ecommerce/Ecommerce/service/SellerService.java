package com.Ecommerce.Ecommerce.service;

import com.Ecommerce.Ecommerce.model.Product;
import com.Ecommerce.Ecommerce.model.ProductImage;
import com.Ecommerce.Ecommerce.repository.ProductImageRepository;
import com.Ecommerce.Ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SellerService {
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;

    public void addProduct(Product product, List<MultipartFile> images) {
        // Save the product first
        productRepository.save(product);

        // Create and save ProductImage entities
        for (MultipartFile image : images) {
            String fileName = generateFileName(image);
            String uploadDirectory = "D:\\Data\\Spring Code\\E-commerce\\imgs\\";
            String filePath = uploadDirectory + fileName;
            try {
                image.transferTo(new File(filePath));
                String imageUrl = "/img/" + fileName;

                ProductImage productImage = new ProductImage();
                productImage.setImageUrl(imageUrl);
                productImage.setProduct(product); // Set the product for each product image
                productImageRepository.save(productImage); // Save the product image entity
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private String generateFileName(MultipartFile file) {
        return "image_" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
    }
}
