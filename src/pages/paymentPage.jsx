import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  Input,
  Flex,
  Stack,
  useToast,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { FaGooglePay, FaApple } from "react-icons/fa";
import wonkaStyles from "../styles";
import ProfileMenu from "../components/profileMenu";

function PaymentPage() {
  const [balance, setBalance] = useState(100); // Example balance
  const toast = useToast();

  const handlePayment = (method) => {
    toast({
      title: `Payment with ${method}`,
      description: "This is a mock payment action.",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <React.StrictMode>
      <Container maxW="container.xl" p={4}>
        <VStack spacing={0} h="100vh">
          {/* Header */}
          <Box
            bg={wonkaStyles.colors.primary}
            color={wonkaStyles.colors.white}
            w="full"
            p={3}
            textAlign="center"
            fontWeight="bold"
            position="sticky"
            top={0}
            zIndex={999}
          >
            <Flex alignItems="center" justifyContent="space-between">
              <Box ml={4} color={wonkaStyles.colors.headerTextColor}>
                Wonka Buster
              </Box>
              <ProfileMenu />
            </Flex>
          </Box>

          {/* Payment Section */}
          <Container
            maxW="container.xl"
            flex="1"
            overflowY="auto"
            py={6}
            maxWidth={500}
          >
            <Heading mb={6} color={wonkaStyles.colors.primary}>
              Payment
            </Heading>
            <Box
              bg={wonkaStyles.colors.background}
              p={5}
              borderRadius="md"
              boxShadow="md"
            >
              <Text fontSize="xl" mb={6}>
                Current Balance: ${balance}
              </Text>
              <Divider mb={6} />

              {/* Payment Inputs */}
              <Stack spacing={4} mb={6}>
                <Input placeholder="Card Number" />
                <Input placeholder="Expiry Date" />
                <Input placeholder="CVV" />
                <Button
                  colorScheme="blue"
                  onClick={() => handlePayment("Credit Card")}
                >
                  Pay with Credit Card
                </Button>
              </Stack>

              {/* Alternative Payment Methods */}
              <Heading size="md" mb={4}>
                Or pay with
              </Heading>
              <Flex justify="space-between">
                <Button
                  leftIcon={<FaGooglePay />}
                  onClick={() => handlePayment("Google Pay")}
                  bg="black"
                  color="white"
                  _hover={{ bg: "gray.700" }}
                >
                  Google Pay
                </Button>
                <Button
                  leftIcon={<FaApple />}
                  onClick={() => handlePayment("Apple Pay")}
                  bg="black"
                  color="white"
                  _hover={{ bg: "gray.700" }}
                >
                  Apple Pay
                </Button>
              </Flex>
            </Box>
          </Container>

          {/* Footer */}
          <Box
            bg={wonkaStyles.colors.primary}
            color={wonkaStyles.colors.headerTextColor}
            w="full"
            p={2}
            textAlign="center"
            fontWeight="bold"
            position="sticky"
            bottom={0}
            zIndex={999}
          >
            Wonka Buster
          </Box>
        </VStack>
      </Container>
    </React.StrictMode>
  );
}

export default PaymentPage;
