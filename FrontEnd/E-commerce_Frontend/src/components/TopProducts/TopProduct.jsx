import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Flex, Heading, Box } from '@chakra-ui/react';
import ProductCard from '../ProductCard/ProductCard';

export default function TopProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/buyer/get-all-products', {
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
  }, []);

  const chunkArray = (arr, chunkSize) => {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunkedArray.push(arr.slice(i, i + chunkSize));
    }
    return chunkedArray;
  };

  const productRows = chunkArray(products, 3);

  return (
    <Flex direction="column" alignItems="center" px={4} py={8}>
      <Heading as="h2" size="lg" mb={4}>
        Top Products
      </Heading>
      {productRows.map((row, index) => (
        <Box key={index} mb={6}>
          <Flex justifyContent="center" gap={4}>
            {row.map((product) => (
              <Box key={product.id} flex="1 0 25%">
                <ProductCard
                  key={product.id}
                  name={product.name}
                  imageURL={product.imageURL}
                  price={product.price}
                  productId={product.id}
                />
              </Box>
            ))}
          </Flex>
        </Box>
      ))}
    </Flex>
  );
}
