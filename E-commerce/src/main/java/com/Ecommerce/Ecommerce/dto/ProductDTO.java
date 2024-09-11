package com.Ecommerce.Ecommerce.dto;

import com.Ecommerce.Ecommerce.model.Category;
import com.Ecommerce.Ecommerce.model.ProductImage;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Integer id;
    private String productName;
    private double price;
    private int quantity;
    private String description;
    private float rate;
    private List<ProductImage> images;
    private Category category;
    private String ownerFirstName;
    private String ownerLastName;

}