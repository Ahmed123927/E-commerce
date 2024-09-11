package com.Ecommerce.Ecommerce.service;

import com.Ecommerce.Ecommerce.dto.ProductDTO;
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
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SellerService {
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    BuyerService buyerService;

    public void addProduct(Product product, List<MultipartFile> images) {

        productRepository.save(product);

        for (MultipartFile image : images) {
            String fileName = generateFileName(image);
            String uploadDirectory = "D:\\Data\\Spring Code\\E-commerce\\FrontEnd\\E-commerce_Frontend\\public\\images\\";
            String filePath = uploadDirectory + fileName;
            try {
                image.transferTo(new File(filePath));


                ProductImage productImage = new ProductImage();
                productImage.setImageUrl(fileName);
                productImage.setProduct(product);
                productImageRepository.save(productImage);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    private String generateFileName(MultipartFile file) {
        return  file.getOriginalFilename();
    }

    public List<ProductDTO> getOwnProduct(User user){
        List<Product> products=productRepository.findByUserId(user.getId());
        return products.stream().map(this::convertToDTO).collect(Collectors.toList());
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



        productRepository.save(product);
    }
    public ProductDTO convertToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setProductName(product.getProductName());
        dto.setPrice(product.getPrice());
        dto.setQuantity(product.getQuantity());
        dto.setImages(product.getImages());
        dto.setDescription(product.getDescription());
        dto.setRate(product.getRate());
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
