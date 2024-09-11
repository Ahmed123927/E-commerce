import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, FormControl, FormLabel, Input, Select, Textarea, ListItem, UnorderedList, Alert, AlertIcon } from '@chakra-ui/react';

const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
 
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [token, setToken] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    
    const storedToken = sessionStorage.getItem('token');
    console.log('Stored token:', storedToken);
    if (storedToken) {
      setToken(storedToken);
    }
    
    fetchCategories();
  }, []);
 const storedToken = sessionStorage.getItem('token');
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/seller/category/all', {
        headers: {
          'Authorization': `Bearer ${storedToken}`
        }
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('description', description);
   
    formData.append('category', category);
    
    
    const filesToUpload = Array.from(selectedFiles ?? []);
  
    // Iterate over filesToUpload
    filesToUpload.forEach((file) => {
      formData.append('files', file);
    });
  
    try {
      const response = await axios.post('http://localhost:8080/api/seller/product/add', formData, {
        headers: {
          'Authorization': `Bearer ${storedToken}` // Send token in header
        }
      });
      console.log('Product added successfully:', response.data);
      // Clear form fields after successful submission if needed
      setProductName('');
      setPrice('');
      setQuantity('');
      setDescription('');
     
      setCategory('');
      setSelectedFiles([]);
      setSuccessMessage('Product added successfully');
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding product:', error);
      setSuccessMessage('');
      setErrorMessage('Failed to add product');
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} maxW="600px" m="auto">
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
      <FormControl>
        <FormLabel>Product Name</FormLabel>
        <Input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Price</FormLabel>
        <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Quantity</FormLabel>
        <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Description</FormLabel>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </FormControl>

 

      <FormControl mt={4}>
        <FormLabel>Category</FormLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.categoryName}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl mt={4}>
        <FormLabel>Upload Files</FormLabel>
        <Input type="file" multiple onChange={(e) => setSelectedFiles(e.target.files)} />
      </FormControl>

      <Button mt={4} colorScheme="blue" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default AddProductForm;
