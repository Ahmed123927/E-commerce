import { Box, Container, Flex, Text, Grid, GridItem, Image } from "@chakra-ui/react";

export default function Hero() {
  return (
    <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
      <Container maxW="container.xl">
        <Flex direction={{ base: "column", lg: "row" }} alignItems="center" justifyContent="space-between">
          <Box flex="1">
            <Text fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }} fontWeight="bold" letterSpacing="tight" color="blue.600">
              Fast Delivery, Every Time
            </Text>
            <Text maxW="xl" color="gray.600" fontSize={{ base: "md", lg: "lg" }} mt={4}>
              Get your orders delivered quickly and conveniently with our industry-leading fast delivery service.
            </Text>
            <Grid templateColumns="1fr" gap={4} mt={8}>
              <GridItem>
                <Text fontSize="lg" fontWeight="bold" color="green.600">Same-Day Delivery</Text>
                <Text color="gray.600">
                  Order before 2pm and get your items delivered the same day.
                </Text>
              </GridItem>
              <GridItem>
                <Text fontSize="lg" fontWeight="bold" color="green.600">Free Shipping</Text>
                <Text color="gray.600">
                  Enjoy free shipping on all orders, no minimum spend required.
                </Text>
              </GridItem>
              <GridItem>
                <Text fontSize="lg" fontWeight="bold" color="green.600">Tracking Updates</Text>
                <Text color="gray.600">
                  Stay informed with real-time tracking updates on your order.
                </Text>
              </GridItem>
              <GridItem>
                <Text fontSize="lg" fontWeight="bold" color="green.600">Easy Returns</Text>
                <Text color="gray.600">
                  Return your items hassle-free within 30 days of delivery.
                </Text>
              </GridItem>
            </Grid>
          </Box>
          <Box flex="1" ml={{ base: 0, lg: 8 }}>
            <Image
              src="/delivery.jpg"
              alt="Fast Delivery"
              borderRadius="xl"
              boxShadow="2xl"
              objectFit="cover"
              objectPosition="center"
              height="auto"
              width="100%"
            />
          </Box>
        </Flex>
      </Container>
    </section>
  );
}
