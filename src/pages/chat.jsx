import React, { useState } from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  Flex,
  InputGroup,
  Textarea,
  InputRightElement,
  Badge,
} from "@chakra-ui/react";
import { MdSend } from "react-icons/md";
import { Icon } from "@chakra-ui/react";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    const newUserMessage = { text: input, sender: "user" };
    setMessages([...messages, newUserMessage]);
    setInput("");

    // Simulate a response from the system
    setTimeout(() => {
      const systemResponse = {
        text: "This is a response from the system.",
        sender: "system",
      };
      setMessages([...messages, newUserMessage, systemResponse]);
    }, 1000);
  };

  return (
    <Flex
      flex="1"
      direction="column"
      m={4}
      borderRadius="10px"
      boxShadow="lg"
      overflow="hidden"
      h="100%"
    >
      <Flex
        flex="1"
        direction="column"
        justifyContent="space-between"
        p={4}
        overflowY="auto"
      >
        {" "}
        <Box overflowY="auto" flex="1">
          <VStack spacing={4} align="stretch">
            {messages.map((message, index) => (
              <Flex key={index}>
                <Box
                  p={3}
                  borderRadius="8px"
                  bg={message.sender === "user" ? "teal.500" : "white"}
                >
                  <Text
                    fontSize="xl"
                    color={message.sender === "user" ? "white" : "gray.800"}
                  >
                    {message.text}
                  </Text>
                </Box>
              </Flex>
            ))}
            <div ref={messagesEndRef} />
          </VStack>
        </Box>
        <Box mb={4} textAlign="center">
          <Flex justifyContent="center">
            <Badge
              flex="1"
              mr={2}
              whiteSpace="nowrap"
              fontSize="lg"
              color="teal.500" // Match font color with input field
              bg="gray.100" // Match background color with input field
              borderRadius="1rem"
              px={4}
              py={2}
              textTransform="none" // Prevent uppercase transformation
              _hover={{
                bg: "teal.200", // Adjust hover background color if needed
              }}
              onClick={() => setInput("Summarize the document for me")}
            >
              Summarize the document for me
            </Badge>

            <Badge
              flex="1"
              whiteSpace="nowrap"
              fontSize="lg"
              color="teal.500" // Match font color with input field
              bg="gray.100" // Match background color with input field
              borderRadius="1rem"
              px={4}
              py={2}
              textTransform="none" // Prevent uppercase transformation
              _hover={{
                bg: "teal.200", // Adjust hover background color if needed
              }}
              onClick={() => setInput("Summarize date-sensitive things")}
            >
              Summarize date-sensitive things
            </Badge>
          </Flex>
        </Box>
        <Flex mt={4} mb={4} w="75%" mx="auto">
          <Box flex="1" mr={4}>
            <InputGroup mb={3}>
              <Textarea
                placeholder="Type your question here.."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                borderColor="teal.500"
                resize="none"
                size="lg"
                bg="gray.100"
                h="auto"
              />
              <InputRightElement>
                <Button variant="ghost" onClick={handleSend}>
                  <Icon as={MdSend} color="teal.500" fontSize="2rem" />
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Chat;
