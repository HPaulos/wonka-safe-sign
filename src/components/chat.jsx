import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  Flex,
  InputGroup,
  Textarea,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import { MdSend } from "react-icons/md";
import wonkaStyles from "../styles.js";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = () => {
    const newUserMessage = { text: input, sender: "user" };
    setMessages([...messages, newUserMessage]);
    setInput("");

    // Simulate a response
    setTimeout(() => {
      const systemResponse = {
        text: "Response from the system.",
        sender: "system",
      };
      setMessages((m) => [...m, systemResponse]);
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const calculateRows = (text) => {
    const lines = text.split("\n");
    const numLines = lines.length;
    const numRows = Math.min(6, Math.max(1, numLines));
    return numRows;
  };

  return (
    <Flex
      flex="1"
      direction="column"
      m={4}
      borderRadius="10px"
      boxShadow="lg"
      h="100%"
    >
      {/* Scrollable message area */}
      <Box flex="1" p={4} overflowY="auto">
        <VStack spacing={4} align="stretch">
          {messages.map((message, index) => (
            <Box
              key={index}
              p={3}
              borderRadius="8px"
              bg={
                message.sender === "user" ? wonkaStyles.colors.primary : "white"
              }
              alignSelf="flex-start" // Align all messages to the left
            >
              <Text
                fontSize="xl"
                color={message.sender === "user" ? "white" : "black"}
              >
                {message.text}
              </Text>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </VStack>
      </Box>

      {/* Fixed input area with added bottom margin */}
      <InputGroup size="lg" mb={7}>
        <Textarea
          placeholder="Type your question here..."
          onKeyDown={handleKeyDown}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          borderColor={wonkaStyles.colors.primary}
          bg={wonkaStyles.colors.background}
          resize="vertical"
          rows={calculateRows(input)}
        />
        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={handleSend}
            {...wonkaStyles.buttonStyle}
          >
            <Icon as={MdSend} />
          </Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
}

export default Chat;
