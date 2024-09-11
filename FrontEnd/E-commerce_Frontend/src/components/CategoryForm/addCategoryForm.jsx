import React, { useState, useEffect } from 'react';
import { Button, Text, Flex, Select, FormControl, FormLabel, Input, Alert, AlertIcon } from '@chakra-ui/react';
import axios from 'axios';

export default function AddCategoryForm() {
  const [categoryName, setCategoryName] = useState('');
  const [parentCategory, setParentCategory] = useState(null);
  const [parentCategories, setParentCategories] = useState([]);
  const [token, setToken] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Retrieve token from sessionStorage
    if (storedToken) {
      setToken(storedToken);
    }
    
    fetchParentCategories();
  }, []);
  const storedToken = sessionStorage.getItem('token');

  const fetchParentCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/get-parent-categories', {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      });
      setParentCategories(response.data);
    } catch (error) {
      console.error('Error fetching parent categories:', error);
    }
  };

  const handleAddCategory = () => {
    // Construct request body
    const requestBody = {
      categoryName: categoryName,
      parentCategory: parentCategory ? { id: parentCategory } : null
    };

    // Send POST request to add category
    axios.post('http://localhost:8080/api/admin/category/add', requestBody, {
      headers: {
        Authorization: `Bearer ${storedToken}`
      }
    })
      .then(response => {
        console.log('Category added successfully:', response.data);
        setSuccessMessage('Category added successfully.');
        setErrorMessage('');
        // Reset form fields after adding category
        setCategoryName('');
        setParentCategory(null);
      })
      .catch(error => {
        console.error('Error adding category:', error);
        setSuccessMessage('');
        setErrorMessage('Error adding category. Please try again.');
      });
  };

  return (
    <Flex
      h="100vh"
      bgGradient="linear(to-b, #f0f0f0, #c0c0c0)"
      py={12}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      px={8}
    >
      <Text fontSize="4xl" fontWeight="bold" color="teal.900" mb={8}>
        Add Category
      </Text>
      {successMessage && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
      <FormControl id="categoryName" mb={4}>
        <FormLabel>Category Name</FormLabel>
        <Input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </FormControl>
      <FormControl id="parentCategory" mb={4}>
        <FormLabel>Parent Category</FormLabel>
        <Select
          placeholder="Select parent category (optional)"
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
        >
          {parentCategories.map(category => (
            <option key={category.id} value={category.id}>{category.categoryName}</option>
          ))}
        </Select>
      </FormControl>
      <Button
        colorScheme="teal"
        onClick={handleAddCategory}
        disabled={!categoryName} 
      >
        Add Category
      </Button>
    </Flex>
  );
}
