package com.Ecommerce.Ecommerce.controller;

import com.Ecommerce.Ecommerce.model.Category;
import com.Ecommerce.Ecommerce.service.AdminService;
import com.Ecommerce.Ecommerce.service.BuyerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")

public class AdminController {

    private final AdminService adminService;
    private final BuyerService buyerService;

    /////////////////////////////////////Category Api's//////////////////////////////////////////////////
    @PostMapping("/category/add")
//    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<String> addCategory(@RequestBody Category category) {
        adminService.add(category);
        return ResponseEntity.ok("Category Added Successfully");
    }

    @DeleteMapping("/category/delete/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable int id) {
        adminService.delete(id);
        return ResponseEntity.ok("Category Deleted Successfully");
    }

    @PutMapping("/category/update/{id}")
    public ResponseEntity<String> updateCategory(@PathVariable int id, @RequestBody Category category) {
        adminService.update(id, category);
        return ResponseEntity.ok("Category updated Successfully");
    }

    @GetMapping("/category/all")
    public ResponseEntity<List<Category>> getAllCategories() {

        return ResponseEntity.ok(adminService.getAllCategory());
    }

    @GetMapping("/get-parent-categories")
    public ResponseEntity<List<Category>> getAllParentCategory(){
        return ResponseEntity.ok(buyerService.getAllParentCategories());
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////
}
