package com.Ecommerce.Ecommerce.controller;

import com.Ecommerce.Ecommerce.model.Product;
import com.Ecommerce.Ecommerce.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/seller")
@RequiredArgsConstructor

public class SellerController {
    private final SellerService sellerService;


    @PostMapping("/product/add")
    public ResponseEntity<String> addProduct(@ModelAttribute Product product,
                                             @RequestParam("files") List<MultipartFile> files) {
        sellerService.addProduct(product, files);
        return ResponseEntity.ok("Product Added Successfully");
    }
}
