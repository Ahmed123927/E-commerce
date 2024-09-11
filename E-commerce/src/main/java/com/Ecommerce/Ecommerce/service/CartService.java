package com.Ecommerce.Ecommerce.service;

import com.Ecommerce.Ecommerce.model.Cart;
import com.Ecommerce.Ecommerce.model.CartItem;
import com.Ecommerce.Ecommerce.model.Product;
import com.Ecommerce.Ecommerce.model.User;
import com.Ecommerce.Ecommerce.repository.CartItemRepository;
import com.Ecommerce.Ecommerce.repository.CartRepository;
import com.Ecommerce.Ecommerce.repository.ProductRepository;
import com.Ecommerce.Ecommerce.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CartItemRepository cartItemRepository;

    public void addToCart(int userId, int productId, int quantity) {
    // Retrieve the product from the database
    Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));

   Optional<User> optionalUser=userRepository.findById(userId);
    if(optionalUser.isEmpty()){
        throw new RuntimeException("User not found");
    }

    Cart cart = cartRepository.findByUserId(userId)
            .orElseGet(() -> {
                Cart newCart = new Cart();
                newCart.setUser(optionalUser.get());
                return newCart;
            });


    Optional<CartItem> existingItem = cart.getCartItems().stream()
            .filter(item -> item.getProduct().getId().equals(productId))
            .findFirst();

    if (existingItem.isPresent()) {

        CartItem cartItem = existingItem.get();
        cartItem.setQuantity(cartItem.getQuantity() + quantity);
    } else {

        CartItem cartItem = new CartItem();
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);
        cartItem.setCart(cart);
        cart.getCartItems().add(cartItem);
    }


    cartRepository.save(cart);
}


//public List<CartItem> getAllCartItems(Integer userId) {
//        return cartRepository.findByUserId(userId);
//}

    public List<CartItem> getAllProductItemsInCart(Integer userId) {

        Optional<Cart> optionalCart = cartRepository.findByUserId(userId);


        if (optionalCart.isPresent()) {

            return optionalCart.get().getCartItems();
        } else {

            return Collections.emptyList();
        }
    }

    @Transactional
    public void removeFromCart(int userId, int productId) {
        Optional<Cart> optionalCart = cartRepository.findByUserId(userId);

        if (optionalCart.isPresent()) {
            Cart cart = optionalCart.get();
            int cartId = cart.getId();

            // Find the cart item to remove
            Optional<CartItem> optionalCartItem = cart.getCartItems().stream()
                    .filter(item -> item.getProduct().getId().equals(productId))
                    .findFirst();

            // If the cart item is found, remove it
            optionalCartItem.ifPresent(cartItem -> {

                cartItemRepository.deleteCartItemByCart_IdAndProductId(cartId, productId);

                cart.removeItem(cartItem);
            });
        }
    }

}
