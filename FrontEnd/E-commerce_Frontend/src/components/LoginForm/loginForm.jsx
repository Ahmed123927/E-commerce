import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Stack, Flex, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

export default function loginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setErrorMsg('');

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password,
      });

      console.log('Login response data:', response.data); 

      const token = response.data.token;
      console.log('Received token:', token);

     
      localStorage.setItem('token', token);
      console.log('Token saved to local storage');

      sessionStorage.setItem('token', token);
     
      const decodedToken = parseJwt(token);
      const userRole = decodedToken.roles[0]; 
      console.log('User role:', userRole);

     
      if (userRole === 'ADMIN') {
        navigate('/admin');
      } 
      else if (userRole === 'SELLER') {
        navigate('/sellerHome');
      }
      else if (userRole === 'BUYER'){

        navigate('/shop')
      }

      // Handle successful login
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMsg('Login failed. Please try again.');
    }
  };

  // Function to parse JWT token manually
  const parseJwt = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button colorScheme="teal" onClick={handleLogin}>
            Log In
          </Button>
          {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
        </Stack>
      </Flex>
    </Stack>
  );
}
