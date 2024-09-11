package com.Ecommerce.Ecommerce.controller;

import com.Ecommerce.Ecommerce.dto.ProductDTO;
import com.Ecommerce.Ecommerce.model.CartItem;
import com.Ecommerce.Ecommerce.model.Category;
import com.Ecommerce.Ecommerce.model.Payment;
import com.Ecommerce.Ecommerce.model.User;
import com.Ecommerce.Ecommerce.repository.UserRepository;
import com.Ecommerce.Ecommerce.service.BuyerService;
import com.Ecommerce.Ecommerce.service.CartService;
import com.Ecommerce.Ecommerce.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:5173")

@RestController
@RequestMapping("/api/buyer")
@RequiredArgsConstructor

public class BuyerController {
    private final BuyerService buyerService;
    private final UserRepository userRepository;

    private final PaymentService paymentService;
    private final CartService cartService;
    @GetMapping("/get-parent-categories")
    public ResponseEntity<List<Category>> getAllParentCategory(){
        return ResponseEntity.ok(buyerService.getAllParentCategories());
    }
    @GetMapping("/get-all-products")
    public ResponseEntity<List<ProductDTO>> getAllProducts(){
        return ResponseEntity.ok(buyerService.getAllProducts());
    }
    @GetMapping("/get-all-products/{id}")
    public ResponseEntity<List<ProductDTO>> getAllProductsByCategoryId( @PathVariable int id){
        return ResponseEntity.ok(buyerService.getAllProductsByCategoryId(id));
    }

    @PostMapping("/add-to-cart/{productId}")
public ResponseEntity<String> addToCart(@PathVariable int productId) {
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
    int userId = user.getId();

        System.out.println(userId);
    cartService.addToCart(userId, productId, 1);
    return ResponseEntity.ok("Product added to cart successfully.");
}
    @GetMapping("/cart")
    public ResponseEntity<List<CartItem>> getCartItems() {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }

            User user = (User) authentication.getPrincipal();
            Optional<User> optionalUser = userRepository.findById(user.getId());
            if (optionalUser.isEmpty()) {
                return null;
            }

            user = optionalUser.get();
            int userId = user.getId();


        List<CartItem> cartItems = cartService.getAllProductItemsInCart(userId);

        return ResponseEntity.ok(cartItems);
    }

    @DeleteMapping("/remove-from-cart/{productId}")
    public ResponseEntity<String> removeFromCart(@PathVariable int productId) {
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
        int userId = user.getId();

        cartService.removeFromCart(userId, productId);
        return ResponseEntity.ok("Product removed from cart successfully.");
    }

    @PostMapping("/checkout")
    public ResponseEntity<String> checkout(@RequestBody Payment payment) {
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
    payment.setUser(user);
    paymentService.addPayment(payment);
    return ResponseEntity.ok("Payment added successfully.");
}


}
