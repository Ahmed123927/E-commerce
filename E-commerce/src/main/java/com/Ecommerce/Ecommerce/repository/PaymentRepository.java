package com.Ecommerce.Ecommerce.repository;

import com.Ecommerce.Ecommerce.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment,Integer> {
}
