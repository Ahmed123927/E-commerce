package com.Ecommerce.Ecommerce.service;

import com.Ecommerce.Ecommerce.model.Product;
import com.Ecommerce.Ecommerce.model.ProductImage;
import com.Ecommerce.Ecommerce.model.User;
import com.Ecommerce.Ecommerce.repository.ProductImageRepository;
import com.Ecommerce.Ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

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

    public List<Product> getOwnProduct(User user){
        return productRepository.findByUserId(user.getId());
    }

    public void deleteProduct(int id){
        productRepository.deleteById(id);
        productImageRepository.deleteAllByProductId(id);
    }

    public  List<Product> getByCategory(int id){
        return productRepository.findByCategoryId(id);
    }
    public List<Product> getByCategoryAndOwner(Integer categoryId, Integer user) {
        return productRepository.findByCategoryIdAndUserId(categoryId, user);
    }

    public Optional<Product> getProductById(Integer id){
        return productRepository.findById(id);
    }

    public void updateProduct(int id, Product updatedProduct) {
        // Check if the product exists
        Optional<Product> optionalProduct = productRepository.findById(id);
        if (optionalProduct.isEmpty()) {

            return;
        }

        Product product = optionalProduct.get();

        if (updatedProduct.getUser() != null) {
            product.setUser(updatedProduct.getUser());
        }
        if (updatedProduct.getProductName() != null) {
            product.setProductName(updatedProduct.getProductName());
        }
        if (updatedProduct.getCategory() != null) {
            product.setCategory(updatedProduct.getCategory());
        }
        if (updatedProduct.getDescription() != null) {
            product.setDescription(updatedProduct.getDescription());
        }
        if (updatedProduct.getImages() != null) {
            product.setImages(updatedProduct.getImages());
        }

            product.setPrice(updatedProduct.getPrice());
        product.setQuantity(updatedProduct.getQuantity());


        // Save the updated product
        productRepository.save(product);
    }
}
