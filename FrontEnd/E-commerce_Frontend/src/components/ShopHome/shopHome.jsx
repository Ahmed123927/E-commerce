import React, { useState, useEffect } from 'react';
import { Box, Container, Heading, SimpleGrid, Button } from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi'; // Import cart icon
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios'; // Import axios for making HTTP requests
import ProductCard from '../ProductCard/ProductCard';
import { Flex } from '@chakra-ui/react';
import TopProduct from '../TopProducts/TopProduct';

const ShopHome = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
       
        const token = sessionStorage.getItem('token');

       
        if (token) {
            axios.get('http://localhost:8080/api/buyer/get-parent-categories', {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            })
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
        } else {
            console.error('Token not found in local storage');
        }
    }, []); 

    const handleCategoryClick = (categoryId) => {
       
        window.location.href = `/category/${categoryId}`;
    };

    const handleCartClick = () => {
        
        window.location.href = '/cart';
    };

    const handleLogout = () => {
      
        sessionStorage.clear();
        window.location.href = '/';
    };

    return (
        <Box>
            {/* Navigation */}
            <Box as="nav" bg="white" boxShadow="sm" py={4}>
                <Container maxW="container.lg">
                    <Flex justifyContent="space-between" alignItems="center">
                        <Heading as="h1" fontSize="xl" fontWeight="bold">E commerce</Heading>
                        <Flex alignItems="center">
                            <FiShoppingCart size={24} onClick={handleCartClick} style={{ cursor: 'pointer' }} /> {/* Cart icon */}
                            <Button ml={4} colorScheme="red" variant="outline" onClick={handleLogout}>Logout</Button>
                        </Flex>
                    </Flex>
                </Container>
            </Box>

            {/* Slider */}
            <Box h="90vh" overflow="hidden">
                <Carousel showThumbs={false} autoPlay infiniteLoop interval={3000} showArrows={true} showStatus={false}>
                    <div>
                        <img src="/slider1.jpg" alt="Slide 1" style={{ objectFit: 'cover', height: '90vh' }} />
                    </div>
                    <div>
                        <img src="/slider2.jpg" alt="Slide 2" style={{ objectFit: 'cover', height: '90vh' }} />
                    </div>
                    <div>
                        <img src="/slider3.jpg" alt="Slide 3" style={{ objectFit: 'cover', height: '90vh' }} />
                    </div>
                </Carousel>
            </Box>

           

            {/* Category Section */}
            <Box py={5} bg="gray.100">
                <Container maxW="container.lg">
                    <Heading as="h2" fontSize="4xl" textAlign="center" mb={8}>Our Categories</Heading>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                        {/* Map over categories and render category cards */}
                        {categories.map(category => (
                            <Box
                                key={category.id}
                                as="button"
                                bg="white"
                                boxShadow="md"
                                p={6}
                                borderRadius="lg"
                                textAlign="center"
                                border="none"
                                transition="all 0.3s"
                                _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
                                onClick={() => handleCategoryClick(category.id)} // Call handleCategoryClick function
                            >
                                <Heading as="h3" fontSize="xl" mb={4}>{category.categoryName}</Heading>
                            </Box>
                        ))}
                    </SimpleGrid>
                </Container>
            </Box>

            {/* Product Section */}
            {/* Add your product section here */}

            <TopProduct />
            
            {/* Footer */}
            <Box as="footer" py={5} bg="gray.800" color="white">
                <Container maxW="container.lg">
                    <Heading as="p" fontSize="lg" textAlign="center" mb={2}>Copyright &copy; Your Website 2023</Heading>
                </Container>
            </Box>
        </Box>
    );
};

export default ShopHome;
