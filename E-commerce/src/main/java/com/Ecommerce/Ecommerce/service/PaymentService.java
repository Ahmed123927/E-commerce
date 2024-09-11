package com.Ecommerce.Ecommerce.service;

import com.Ecommerce.Ecommerce.encryption.AES;
import com.Ecommerce.Ecommerce.model.Payment;
import com.Ecommerce.Ecommerce.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository paymentRepository;

    public void addPayment(Payment payment){
    Payment payment1 = Payment.builder()
            .user(payment.getUser())
            .cvv(payment.getCvv())
            .creditCard(AES.encrypt(payment.getCreditCard()))
            .build();
    paymentRepository.save(payment1);
}
}
