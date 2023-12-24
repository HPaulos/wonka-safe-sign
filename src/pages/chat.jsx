import React, { useState } from "react";
import {
  Box,
  Input,
  Spacer,
  Button,
  VStack,
  Text,
  Flex,
  List,
  ListItem,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { MdOutlineSend } from "react-icons/md";
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
    <Flex h="100vh" m={4} borderRadius="10px" bg="white" boxShadow="lg">
      <Box
        w="200px"
        borderRight="1px"
        p={4}
        borderColor="gray.200"
        bg="gray.50" // Set background color
      >
        <List spacing={3}>
          <ListItem
            fontSize="lg"
            fontWeight="bold"
            color="teal.500"
            _hover={{ color: "teal.700", cursor: "pointer" }}
          >
            List Item 1
          </ListItem>
          <ListItem fontSize="lg" _hover={{ bg: "teal.50", cursor: "pointer" }}>
            List Item 2
          </ListItem>
          <ListItem fontSize="lg" _hover={{ bg: "teal.50", cursor: "pointer" }}>
            List Item 3
          </ListItem>
        </List>
      </Box>

      <Flex
        flexDirection="column"
        justifyContent="space-between"
        w="100%"
        p={4}
      >
        <Box overflowY="auto" flex="1">
          <VStack spacing={4} align="stretch">
            {messages.map((message, index) => (
              <Flex key={index}>
                <Box
                  p={3}
                  borderRadius="8px"
                  bg={message.sender === "user" ? "teal.500" : "gray.200"}
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

        <Flex mt={4} mb={4} w="75%" mx="auto">
          <Box flex="1" mr={4}>
            <InputGroup size="lg">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder="Type a message"
                bg="gray.100" // Set background color
                focusBorderColor="teal.500"
                borderColor="teal.500"
                borderWidth={2}
                fontSize="lg"
                borderRadius="full"
                _placeholder={{ color: "gray.500", fontStyle: "italic" }} // Adjust placeholder styling
                _hover={{ borderColor: "teal.300" }} // Change border color on hover
                _focus={{ borderColor: "teal.500", boxShadow: "outline" }} // Adjust focus styles
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={handleSend}
                  variant="unstyled"
                >
                  <Icon as={MdOutlineSend} color="teal.500" boxSize={5} />
                </Button>
              </InputRightElement>
            </InputGroup>{" "}
            <Spacer mx={2} />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Chat;
