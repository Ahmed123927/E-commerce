import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Heading, Text, Button, Flex } from '@chakra-ui/react';
import axios from 'axios';

export default function Seller() {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get('http://localhost:8080/api/auth/get-user-session');
        const { firstname, lastname } = response.data;
        setUserName(`${firstname} ${lastname}`);
        console.log('User data:', response.data)
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    }

    fetchUserData();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    window.location.reload();

    
     window.location.href = '/';
  };

  return (
    <Box h="100vh" bgGradient="linear(to-b, #f0f0f0, #c0c0c0)" py={12} position="relative">
      {/* Logout button */}
      <Button
        size="sm"
        colorScheme="teal"
        variant="outline"
        position="absolute"
        top={4}
        right={4}
        onClick={handleLogout}
      >
        Logout
      </Button>
      <Container maxW="container.lg" h="100%">
        <Box textAlign="center" h="100%" display="flex" flexDirection="column" justifyContent="center">
          <Heading as="h1" size="4xl" color="teal.900" mb={8}>
            Welcome Seller
          </Heading>
          <Text color="teal.900" fontSize="2xl" mb={10}>
            Start adding your products today and grow your business with us.
          </Text>
          <Flex justifyContent="center">
            <Link to="/manage-product">
              <Button
                size="lg"
                variant="outline"
                colorScheme="teal"
                px={12}
                py={7}
                borderColor="teal.900"
                _hover={{ bg: 'teal.900' }}
                _focus={{ boxShadow: 'outline' }}
                mr={4} // Add margin-right to separate buttons
              >
                Manage Products
              </Button>
            </Link>
            <Link to="/orders">
              <Button
                size="lg"
                variant="outline"
                colorScheme="teal"
                px={12}
                py={7}
                borderColor="teal.900"
                _hover={{ bg: 'teal.900' }}
                _focus={{ boxShadow: 'outline' }}
              >
                View Orders
              </Button>
            </Link>
          </Flex>
        </Box>
      </Container>
    </Box>
  );
}
