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
  InputGroup,
  InputRightElement,
  IconButton,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FaPencilAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import firebaseWonkaApp from "../util/firebase-wonka-app";
import {
  getAuth,
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

function WonkaLogin() {
  const checkIfUserIsRegistered = async (email) => {
    const auth = getAuth(firebaseWonkaApp);
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    return signInMethods.length > 0;
  };

  const [newAccount, setNewAccount] = useState(false);
  const [oldAccount, setOldAccount] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false); // TODO: Implement password matching [https://stackoverflow.com/questions/21727317/how-to-check-confirm-password-field-in-form-without-reloading-page
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [disabled, setDisabled] = useState(true); // TODO: Implement disabled button [https://stackoverflow.com/questions/21727317/how-to-check-confirm-password-field-in-form-without-reloading-page

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handlePasswordMatch = (event) => {
    const passwordsMatch = password && event.target.value === password;
    setPasswordsMatch(passwordsMatch);
    setDisabled(!(isEmailValid(email) && password && passwordsMatch));
  };

  const isEmailValid = (email) => {
    // eslint-disable-next-line no-useless-escape
    const emailRegex =
      /^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,4})+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    const checkRegistration = async () => {
      if (email && isEmailValid(email)) {
        const isRegistered = await checkIfUserIsRegistered(email);
        if (isRegistered) {
          setOldAccount(true);
          setNewAccount(false);
        } else {
          setNewAccount(true);
          setOldAccount(false);
        }
      }
    };
    checkRegistration();
  }, [email]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setDisabled(
      !(isEmailValid(event.target.value) && password && passwordsMatch)
    );
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setDisabled(!(isEmailValid(email) && event.target.value && passwordsMatch));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(disabled){
      setError("Please enter a valid email and password");
      return;
    }
    setError(""); // Reset the error message before a new attempt
    const auth = getAuth(firebaseWonkaApp);
    if (newAccount) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // Registered successfully
        console.log(userCredential);
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
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
              <Input
                type="email"
                placeholder="Email Address"
                onChange={handleEmailChange}
              />
            </FormControl>
            {(newAccount || oldAccount) && (
              <FormControl id="password">
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={handlePasswordChange}
                  />
                  <InputRightElement>
                    <IconButton
                      bg="transparent !important"
                      variant="ghost"
                      aria-label={
                        showPassword ? "Mask password" : "Show password"
                      }
                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                      onClick={toggleShowPassword}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            )}
            {newAccount && (
              <FormControl id="confirmPassword" isInvalid={!passwordsMatch}>
                <InputGroup>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    onChange={handlePasswordMatch}
                  />
                  <InputRightElement>
                    <IconButton
                      bg="transparent !important"
                      variant="ghost"
                      aria-label={
                        showConfirmPassword ? "Mask password" : "Show password"
                      }
                      icon={showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      onClick={toggleShowConfirmPassword}
                    />
                  </InputRightElement>
                </InputGroup>
                {!passwordsMatch && (
                  <FormErrorMessage>Passwords do not match</FormErrorMessage>
                )}
              </FormControl>
            )}
            {error && (
              <Alert status="error" mt={4}>
                <AlertIcon />
                {error}
              </Alert>
            )}
            <Button
              disabled={disabled}
              colorScheme="teal"
              type="submit"
              width="full"
              mt={4}
            >
              {newAccount ? "Register" : "Login"}
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
}

export default WonkaLogin;
