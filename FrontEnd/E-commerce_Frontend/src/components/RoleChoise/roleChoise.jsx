import { Box, Button, Checkbox, Flex, FormLabel, Heading, Text, VStack, Grid, useColorModeValue } from '@chakra-ui/react';
export default function roleChoice() {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.900', 'white');
  const checkboxColor = useColorModeValue('white', 'gray.600');
  const checkboxBorderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Flex alignItems="center" justifyContent="center" minH="100vh">
      <Box w="full" maxW="3xl" bg={bgColor} p={8} rounded="lg" shadow="lg">
        <form>
          <VStack spacing={8}>
            <Box>
              <Heading as="h2" size="xl" fontWeight="bold" color={textColor}>
                Join Our Platform
              </Heading>
              <Text fontSize="lg" color="gray.700">
                Choose the role that best fits your profile.
              </Text>
            </Box>
            <Grid gap={6} templateColumns={{ md: 'repeat(2, 1fr)' }}>
              <Box bg={useColorModeValue('gray.100', 'gray.700')} rounded="lg" shadow="md" p={6}>
                <Flex alignItems="center" justifyContent="space-between">
                  <Box>
                    <FormLabel ml={4} fontSize="lg" fontWeight="semibold" color={textColor}>
                      Client
                    </FormLabel>
                  </Box>
                </Flex>
                <Box mt={4}>
                  <Button w="full" variant="outline">
                    Select Client
                  </Button>
                </Box>
              </Box>
              <Box bg={useColorModeValue('white', 'gray.600')} rounded="lg" shadow="lg" p={8}>
                <Flex alignItems="center" justifyContent="space-between">
                  <Box>
                    
                    <FormLabel ml={4} fontSize="lg" fontWeight="semibold" color={textColor}>
                      Freelancer
                    </FormLabel>
                  </Box>
                </Flex>
                <Box mt={4}>
                  <Button w="full" variant="outline">
                    Select Freelancer
                  </Button>
                </Box>
              </Box>
            </Grid>
            <VStack spacing={6}>
              <Button w="160px" variant="outline">
                Back
              </Button>
              <Button w="160px" bg={useColorModeValue('white', 'gray.600')} _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }} color={textColor} type="submit">
                Continue
              </Button>
            </VStack>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}