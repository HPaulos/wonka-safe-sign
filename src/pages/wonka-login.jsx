import React, { useEffect, useState } from 'react';
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
} from '@chakra-ui/react';
import { FaPencilAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import firebaseWonkaApp from '../util/firebase-wonka-app';
import {
  getAuth,
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

function WonkaLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showConfirmPasswordField, setShowConfirmPasswordField] = useState(false);
  const [emailEntered, setEmailEntered] = useState(false);

  const auth = getAuth(firebaseWonkaApp);

  useEffect(() => {
    const checkUserStatus = async () => {
      if (email && isEmailValid(email)) {
        if (await isUserRegisted(email)) {
          setShowConfirmPasswordField(false);
        } else {
          console.log("User is new");
          setShowConfirmPasswordField(true);  
        }
      } else {
        setShowConfirmPasswordField(false);
      }
    };
  
    if (emailEntered) {
      checkUserStatus();
    }
  }, [email, emailEntered, auth]);

  const isUserRegisted = async (email) => {
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    return signInMethods.length > 0;
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passwordsMatch = () => password === confirmPassword;

  const handleContinue = () => {
    if (isEmailValid(email)) {
      setEmailEntered(true);
    } else {
      setError('Invalid email address');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (showConfirmPasswordField && !passwordsMatch()) {
      setError('Passwords do not match');
      return;
    }

    try {
      if (showConfirmPasswordField) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Center h='100vh'>
      <Box p={4}>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} maxWidth='350px' mx='auto'>
            <Flex fontSize='4xl' mb={4} alignItems='center' color='teal.500'>
              <Text>Wonka</Text>
              <Spacer mx={2} />
              <FaPencilAlt />
              <Spacer mx={2} />
              <Text>Buster</Text>
            </Flex>
            <Spacer my={1} />
            <FormControl id='email' isRequired isInvalid={!isEmailValid(email) && emailEntered}>
              <Input
                type='email'
                placeholder='Email Address'
                onChange={handleEmailChange}
                value={email}
                isDisabled={emailEntered}
              />
              {!isEmailValid(email) && emailEntered && <FormErrorMessage>Invalid email address</FormErrorMessage>}
            </FormControl>
            {emailEntered && (
              <>
                <FormControl id='password' isRequired>
                  <InputGroup>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='Password'
                      onChange={handlePasswordChange}
                      value={password}
                    />
                    <InputRightElement>
                      <IconButton
                        bg='transparent !important'
                        variant='ghost'
                        aria-label={showPassword ? 'Mask password' : 'Show password'}
                        icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                        onClick={toggleShowPassword}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                {showConfirmPasswordField && (
                  <FormControl id='confirmPassword' isInvalid={!passwordsMatch()} isRequired>
                    <InputGroup>
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder='Confirm Password'
                        onChange={handleConfirmPasswordChange}
                        value={confirmPassword}
                      />
                      <InputRightElement>
                        <IconButton
                          bg='transparent !important'
                          variant='ghost'
                          aria-label={showConfirmPassword ? 'Mask password' : 'Show password'}
                          icon={showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          onClick={toggleShowConfirmPassword}
                        />
                      </InputRightElement>
                    </InputGroup>
                    {!passwordsMatch() && <FormErrorMessage>Passwords do not match</FormErrorMessage>}
                  </FormControl>
                )}
              </>
            )}
            {error && (
              <Alert status='error' mt={4}>
                <AlertIcon />
                {error}
              </Alert>
            )}
            {!emailEntered ? (
              <Button
                colorScheme='teal'
                onClick={handleContinue}
                width='full'
                mt={4}
                isDisabled={!email}
              >
                Continue
              </Button>
            ) : (
              <Button
                colorScheme='teal'
                type='submit'
                width='full'
                mt={4}
                isDisabled={!password || (showConfirmPasswordField && !passwordsMatch())}
              >
                {showConfirmPasswordField ? 'Register' : 'Login'}
              </Button>
            )}
          </VStack>
        </form>
      </Box>
    </Center>
  );
}

export default WonkaLogin;
