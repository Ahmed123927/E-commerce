package com.Ecommerce.Ecommerce.controller;

import com.Ecommerce.Ecommerce.model.Product;
import com.Ecommerce.Ecommerce.model.User;
import com.Ecommerce.Ecommerce.repository.UserRepository;
import com.Ecommerce.Ecommerce.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/seller")
@RequiredArgsConstructor

public class SellerController {
    private final SellerService sellerService;

    private final UserRepository userRepository;

    @PostMapping("/product/add")
    public ResponseEntity<String> addProduct(@ModelAttribute Product product,
                                             @RequestParam("files") List<MultipartFile> files) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = (User) authentication.getPrincipal();
        Optional<User> optionalUser = userRepository.findById(user.getId());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        user = optionalUser.get();
        product.setUser(user);
        sellerService.addProduct(product, files);
        return ResponseEntity.ok("Product Added Successfully");
    }


    @GetMapping("/product/getown")
    public ResponseEntity<List<Product>> getOwnProducts() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = (User) authentication.getPrincipal();
       return  ResponseEntity.ok(sellerService.getOwnProduct(user));
    }

    @DeleteMapping("/product/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id) {
        sellerService.deleteProduct(id);
        return ResponseEntity.ok("Product Deleted Successfully");
    }

    @GetMapping("/product/cat-filter/{id}")
    public ResponseEntity<List<Product>>getOwnProductBaseOnCategory(@PathVariable int id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        User user = (User) authentication.getPrincipal();
        return  ResponseEntity.ok(sellerService.getByCategoryAndOwner(id,user.getId()));
    }
    @GetMapping("/product/get-product/{id}")
    public ResponseEntity<Optional<Product>> getProductById(@PathVariable int id){
        return ResponseEntity.ok(sellerService.getProductById(id));
    }
    @PutMapping("/product/update/{id}")
    public ResponseEntity<String > updateProduct(@PathVariable int id,@RequestBody Product product){
        sellerService.updateProduct(id,product);
        return ResponseEntity.ok("Product Updated");
    }



}
