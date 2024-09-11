import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Heading, Button, Table, Tbody, Tr, Td, useToast } from '@chakra-ui/react';
import axios from 'axios';

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const toast = useToast();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const storedToken = sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/seller/product/getown', {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch products. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }

    fetchProducts();
  }, [toast]);

  const handleDelete = async (productId) => {
    try {
      const storedToken = sessionStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/seller/product/delete/${productId}`, {
        headers: {
          'Authorization': `Bearer ${storedToken}`
        }
      });
      setProducts(products.filter(product => product.id !== productId));
      toast({
        title: 'Success',
        description: 'Product deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(`Failed to delete product with ID ${productId}:`, error);
      toast({
        title: 'Error',
        description: 'Failed to delete product. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="white" color="black" minH="100vh" py={12}>
      <Container maxW="container.lg">
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={6}>
            Manage Products
          </Heading>
          <Link to="/add-product">
            <Button
              size="sm"
              colorScheme="teal"
              variant="outline"
              mb={4}
            >
              Add Product
            </Button>
          </Link>
          <Table variant="simple" colorScheme="teal">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Description</th>
                <th>Rate</th>
                <th>Category</th>
                <th>Owner</th>
                <th>Action</th>
              </tr>
            </thead>
            <Tbody>
              {products.map(product => (
                <Tr key={product.id}>
                  <Td>{product.productName}</Td>
                  <Td>{product.price}</Td>
                  <Td>{product.quantity}</Td>
                  <Td>{product.description}</Td>
                  <Td>{product.rate}</Td>
                  <Td>{product.category ? product.category.categoryName : 'Uncategorized'}</Td>
                  <Td>{`${product.ownerFirstName} ${product.ownerLastName}`}</Td>
                  <Td>
                    <Button colorScheme="red" size="sm" onClick={() => handleDelete(product.id)}>
                      Delete
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Container>
    </Box>
  );
}
