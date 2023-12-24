import React from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  VStack,
  Text,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { FaGoogle, FaPencilAlt } from "react-icons/fa";

function Login() {
  return (
    <Center h="100vh">
      <Box p={4}>
        <VStack spacing={4} maxWidth="350px" mx="auto">
          <Flex fontSize="4xl" mb={4} alignItems="center" color="teal.500">
            <Text>Wonka</Text>
            <Spacer mx={2} />
            <FaPencilAlt />
            <Spacer mx={2} />
            <Text>Buster</Text>
          </Flex>
          <Spacer my={1}/>
          <FormControl id="email">
            <Input type="email" placeholder="Email Address" />
          </FormControl>
          <FormControl id="password">
            <Input type="password" placeholder="Password" />
          </FormControl>
          <Button colorScheme="teal" type="submit" width="full">
            Login
          </Button>
          <Button
            leftIcon={<FaGoogle />}
            colorScheme="red"
            variant="outline"
            onClick={() => console.log("Login with Google")}
            width="full"
          >
            Login with Google
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}

export default Login;
