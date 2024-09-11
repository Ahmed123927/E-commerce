import { Flex, Link, Text, Button, Box, Image, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link as RouterLink } from 'react-router-dom';

export default function LandingPage() {
  return (
    <Flex direction="column" align="center" justify="center" minHeight="100vh" bg="white">
      {/* Header */}
      <Flex
        as="header"
        width="100%"
        justify="space-between"
        align="center"
        px={[4, 6]}
        py={4}
        color="gray.700"
        position="absolute"
        top="0"
        left="0"
        right="0"
      >
        {/* Logo and title */}
        <Link as={RouterLink} to="/" display="flex" alignItems="center" fontWeight="bold" fontSize="2xl" textDecoration="none">
          <Icon as={AiOutlineShoppingCart} h={8} w={8} color="gray.700" />
          <Text ml={2} color="gray.700"> Ecommerce</Text>
        </Link>
        {/* Navigation */}
        <Flex gap={2}>
          {/* Dropdown Menu for Login */}
          <Menu>
            
            <MenuList>
              
              <MenuItem as={RouterLink} to="/register">Register</MenuItem>
            </MenuList>
          </Menu>
          {/* Redirect to Register page */}
          <Link as={RouterLink} to="/register">
            <Button colorScheme="gray" size="md" bg="#FEB692" _hover={{ bg: "#EA5455" }}>
              Register
            </Button>
          </Link>
        </Flex>
      </Flex>

      {/* Main content */}
      <Box position="relative" zIndex="1">
        <Flex direction={{ base: "column", lg: "row" }} align="center" justify="space-between" py={[12, 24, 32]} px={[4, 6]}>
          {/* Text content */}
          <Flex direction="column" maxW={{ base: "100%", lg: "50%" }} textAlign={{ base: "center", lg: "left" }} color="gray.700" mb={{ base: 8, lg: 0 }}>
            <Text fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }} fontWeight="bold" mb={4}>
              Discover the Best Products
            </Text>
            <Text fontSize={{ base: "lg", md: "xl" }} mb={8}>
              Browse our curated collection of <Text as="span" color="blue.500">high-quality products</Text> for your <Text as="span" color="green.500">home</Text>, <Text as="span" color="green.500">office</Text>, and <Text as="span" color="green.500">lifestyle</Text>.
            </Text>
            <Link as={RouterLink} to="/login">
            <Button colorScheme="gray" size="lg" width={{ base: "100%", md: "200px" }} bg="#FEB692" _hover={{ bg: "#EA5455" }}>
              Login
            </Button>
            </Link>
          </Flex>
          {/* Image */}
          <Box flex="1" ml={{ base: 0, lg: 8 }} height="auto" maxWidth="500px">
            <Image src="/19198725.jpg" alt="Hero" borderRadius="xl" boxShadow="2xl" />
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
