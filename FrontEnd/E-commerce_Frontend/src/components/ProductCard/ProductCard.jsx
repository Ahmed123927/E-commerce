import React from 'react';
import { Box, Flex, Image, Tooltip, chakra, Icon, useColorModeValue, useToast } from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import axios from 'axios'; // Import Axios

const ProductCard = ({ isNew, imageURL, name, price, rating, numReviews, productId }) => {
  const toast = useToast(); // Initialize the useToast hook

  const Rating = ({ rating, numReviews }) => (
    <Box display="flex" alignItems="center">
      {Array(5)
        .fill('')
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: '1' }}
                color={i < rating ? 'teal.500' : 'gray.300'}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} style={{ marginLeft: '1' }} />;
          }
          return <BsStar key={i} style={{ marginLeft: '1' }} />;
        })}
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {numReviews} review{numReviews > 1 && 's'}
      </Box>
    </Box>
  );

  const handleAddToCart = (productId) => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token not found in session storage');
      return;
    }

    axios.post(`http://localhost:8080/api/buyer/add-to-cart/${productId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.status === 200) {
          console.log('Product added to cart successfully');
          // Display a toast message when the product is added successfully
          toast({
            title: 'Product Added',
            description: `${name} has been added to your cart.`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        } else {
          console.error('Failed to add product to cart:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error adding product to cart:', error);
      });
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        overflow="hidden" 
      >
        {isNew && (
          <Box
            position="absolute"
            top={2}
            right={2}
            bg="red.200"
            borderRadius="full"
            px={2}
            py={1}
          >
            New
          </Box>
        )}

        <Image
          src={imageURL}
          alt={`Picture of ${name}`}
          width="100%" // Set width to 100% to make it take up the full width of the card
          height="200px" // Set a static height for the image
          objectFit="cover" // Ensure the image covers the entire space while maintaining aspect ratio
        />

        <Box p="6">
          <Flex justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {name}
            </Box>
            <Tooltip
              label="Add to cart"
              bg="white"
              placement="top"
              color="gray.800"
              fontSize="1.2em"
            >
              <chakra.a href="#" display="flex" onClick={() => handleAddToCart(productId)}>
                <Icon as={FiShoppingCart} h={7} w={7} alignSelf="center" />
              </chakra.a>
            </Tooltip>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center" mt="1">
            <Rating rating={rating} numReviews={numReviews} />
            <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
              <Box as="span" color="gray.600" fontSize="lg">
                EGP
              </Box>
              {price.toFixed(2)}
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default ProductCard;
