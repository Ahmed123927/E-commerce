package com.Ecommerce.Ecommerce.repository;

import com.Ecommerce.Ecommerce.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem,Integer> {
    void deleteCartItemByCart_IdAndProductId(Integer cart_id, Integer product_id);
}
