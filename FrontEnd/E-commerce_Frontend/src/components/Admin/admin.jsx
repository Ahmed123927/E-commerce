import React from 'react';
import { Button, Text, Flex } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function Admin() {
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    window.location.reload();

    
     window.location.href = '/';
  };

  return (
    <Flex
      h="100vh"
      bgGradient="linear(to-b, #f0f0f0, #c0c0c0)"
      py={12}
      position="relative"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
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
      <Text fontSize="4xl" fontWeight="bold" color="teal.900" mb={8}>
        Hello Admin
      </Text>
      <Flex justifyContent="center">
        <Button
          as={RouterLink}
          to="/category"
          size="lg"
          variant="outline"
          colorScheme="teal"
          px={12}
          py={7}
          borderColor="teal.900"
          _hover={{ bg: 'teal.900' }}
          _focus={{ boxShadow: 'outline' }}
          mr={4}
        >
          Add Category
        </Button>
        <Button
          as={RouterLink}
          to="/show-category"
          size="lg"
          variant="outline"
          colorScheme="teal"
          px={12}
          py={7}
          borderColor="teal.900"
          _hover={{ bg: 'teal.900' }}
          _focus={{ boxShadow: 'outline' }}
        >
          Show Categories
        </Button>
      </Flex>
    </Flex>
  );
}
