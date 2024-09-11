import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Divider,
  Image,
  IconButton,
  Button,
  Input,
} from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/fa';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [creditCard, setCreditCard] = useState('');
  const [cvv, setCVV] = useState('');
  const [checkoutMessage, setCheckoutMessage] = useState('');

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('Token not found in session storage');
        return;
      }

      const response = await fetch('http://localhost:8080/api/buyer/cart', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.error('Error fetching cart data:', response.statusText);
        return;
      }

      const data = await response.json();
      setCartItems(data);
      computeTotalPrice(data);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const computeTotalPrice = (data) => {
    let total = 0;
    data.forEach((item) => {
      total += item.quantity * item.product.price;
    });
    setTotalPrice(total.toFixed(2));
  };

  const removeFromCart = async (productId) => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('Token not found in session storage');
        return;
      }

      const response = await fetch(`http://localhost:8080/api/buyer/remove-from-cart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.error('Error removing item from cart:', response.statusText);
        return;
      }

      // Update cart items after successful removal
      setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        console.error('Token not found in session storage');
        return;
      }

      const response = await fetch('http://localhost:8080/api/buyer/checkout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          creditCard,
          cvv
        })
      });

      if (!response.ok) {
        console.error('Error during checkout:', response.statusText);
        setCheckoutMessage('Checkout failed. Please try again.');
        return;
      }

      setCheckoutMessage('Checkout successful!');
    } catch (error) {
      console.error('Error during checkout:', error);
      setCheckoutMessage('An error occurred during checkout.');
    }
  };

  return (
    <Box h="100vh" bg="gray.100">
      <Container py={10} h="100%">
        <Flex justify="center" align="center" h="100%">
          <Box w="full" maxW="lg">
            <Box bg="white" borderRadius="lg" p={4}>
              <Heading size="lg" mb={4}>
                Shopping Cart
              </Heading>
              <Divider />
              <Box mt={4}>
                {/* Cart items */}
                {cartItems.map((item) => (
                  <CartItem
                    key={item.product.id}
                    productId={item.product.id}
                    imgSrc={`/images/${item.product.images[0].imageUrl}`}
                    name={item.product.productName}
                    description={item.product.description}
                    quantity={item.quantity}
                    price={item.product.price}
                    removeFromCart={removeFromCart}
                  />
                ))}
                {/* End of Cart items */}
              </Box>
              <Divider mt={4} />
              <Flex justify="space-between" align="center" mt={4}>
                <Text fontSize="lg">Total:</Text>
                <Text fontSize="lg">${totalPrice}</Text>
              </Flex>
              <Box mt={4}>
                <Input
                  placeholder="Enter Credit Card Number"
                  value={creditCard}
                  onChange={(e) => setCreditCard(e.target.value)}
                />
                <Input
                  placeholder="Enter CVV"
                  value={cvv}
                  onChange={(e) => setCVV(e.target.value)}
                  mt={2}
                />
                <Button mt={4} colorScheme="blue" size="lg" w="full" onClick={handleCheckout}>
                  Checkout
                </Button>
                {checkoutMessage && <Text mt={2}>{checkoutMessage}</Text>}
              </Box>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

const CartItem = ({ imgSrc, name, description, quantity, price, productId, removeFromCart }) => {
  const handleRemoveFromCart = () => {
    removeFromCart(productId);
  };

  return (
    <Box p={4} bg="white" borderRadius="md" boxShadow="md" mb={4}>
      <Flex justify="space-between" align="center">
        <Flex align="center">
          <Image src={imgSrc} alt="Shopping item" boxSize="65px" borderRadius="md" />
          <Box ml={3}>
            <Text fontSize="lg">{name}</Text>
            <Text fontSize="sm" color="gray.500">
              {description}
            </Text>
          </Box>
        </Flex>
        <Flex align="center">
          <Text fontSize="lg">{quantity}</Text>
          <Text fontSize="lg" ml={4}>${price}</Text>
          <IconButton
            icon={<FaTrashAlt />}
            variant="ghost"
            colorScheme="red"
            ml={4}
            onClick={handleRemoveFromCart}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default ShoppingCart;
