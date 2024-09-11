import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams
import { Box, Container, Heading, SimpleGrid } from '@chakra-ui/react';
import ProductCard from '../ProductCard/ProductCard';

const CategoryProducts = () => {
  const { id } = useParams(); 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(`http://localhost:8080/api/buyer/get-all-products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const modifiedProducts = response.data.map(product => ({
          id: product.id,
          name: product.productName,
          price: product.price,
          imageURL: `/images/${product.images[0].imageUrl}`,
          productId: product.id
        }));
        setProducts(modifiedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [id]); 

  const handleAddToCart = (productId) => {
    console.log('Product added to cart:', productId);
   
    alert('Product added to cart successfully!');
  };

  return (
    <Box py={5} bg="gray.100">
      <Container maxW="container.lg">
        <Heading as="h2" fontSize="4xl" textAlign="center" mb={8}>Products </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {products.map(product => (
            <ProductCard
              key={product.id}
              name={product.name}
              imageURL={product.imageURL}
              price={product.price}
              boxSize="320px"
              productId={product.id} // Pass product id
              handleAddToCart={handleAddToCart}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default CategoryProducts;
