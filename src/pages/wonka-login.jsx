import React, { useEffect, useState } from "react";
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
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { FaGoogle, FaPencilAlt } from "react-icons/fa";
import firebaseWonkaApp from "../util/firebase-wonka-app";
import { getAuth, fetchSignInMethodsForEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function WonkaLogin() {
  const checkIfUserIsRegistered = async (email) => {
    const auth = getAuth(firebaseWonkaApp);
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    return signInMethods.length > 0;
  };

  const [newAccount, setNewAccount] = useState(false);
  const [oldAccount, setOldAccount] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isEmailValid = (email) => {
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,4})+$/;
    return emailRegex.test(email);
  }

  useEffect(() => {
    const checkRegistration = async () => {
      if (email && isEmailValid(email)) {
        const isRegistered = await checkIfUserIsRegistered(email);
        if (isRegistered) {
          setOldAccount(true);
          setNewAccount(false);
          setConfirmPassword(false);
        } else {
          setNewAccount(true);
          setOldAccount(false);
          setConfirmPassword(true);
        }
      }
    };
    checkRegistration();
  }, [email]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Reset the error message before a new attempt
    const auth = getAuth(firebaseWonkaApp);
    if (newAccount) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Registered successfully
        console.log(userCredential);
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Logged in successfully
        console.log(userCredential);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <Center h="100vh">
      <Box p={4}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} maxWidth="350px" mx="auto">
            <Flex fontSize="4xl" mb={4} alignItems="center" color="teal.500">
              <Text>Wonka</Text>
              <Spacer mx={2} />
              <FaPencilAlt />
              <Spacer mx={2} />
              <Text>Buster</Text>
            </Flex>
            <Spacer my={1} />
            <FormControl id="email">
              <Input type="email" placeholder="Email Address" onChange={handleEmailChange} />
            </FormControl>
            {(newAccount || oldAccount) && (
              <FormControl id="password">
                <Input type="password" placeholder="Password" onChange={handlePasswordChange} />
              </FormControl>
            )}
            {confirmPassword && (
              <FormControl id="confirmPassword">
                <Input type="password" placeholder="Confirm Password" />
              </FormControl>
            )}
            {error && (
              <Alert status="error" mt={4}>
                <AlertIcon />
                {error}
              </Alert>
            )}
            <Button colorScheme="teal" type="submit" width="full" mt={4}>
              {newAccount ? "Register" : "Login"}
            </Button>
            <Button
              leftIcon={<FaGoogle />}
              colorScheme="red"
              variant="outline"
              onClick={() => console.log("Login with Google")}
              width="full"
              mt={4}
            >
              Login with Google
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
}

export default WonkaLogin;