import React, { useState } from "react";
import {
  Input,
  List,
  ListItem,
  Icon,
  Text,
  VStack,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Container,
  Box,
  Button,
} from "@chakra-ui/react";
import { MdSearch, MdClose } from "react-icons/md";
import { useDebouncedCallback } from "use-debounce";

const documents = [
  { name: "Book 1.pdf" },
  { name: "Document 1.docx" },
  { name: "Text 1.txt" },
  // Add more documents here
];

function Documents() {
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");

  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setSearch(value);
    },
    // delay in ms
    300
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    debounced(e.target.value);
  };

  const clearSearch = () => {
    setInputValue("");
    setSearch("");
  };

  const filteredDocuments = documents.filter((document) =>
    document.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box h="full" overflowY="auto" mt={2}>
      <Container maxW="container.md">
        <InputGroup mb={6}>
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={MdSearch} color="teal.500" />}
          />
          <Input
            placeholder="Type here to search..."
            value={inputValue}
            onChange={handleInputChange}
            borderColor="teal.500"
          />
          <InputRightElement>
            <Button variant="ghost" onClick={clearSearch}>
              <Icon as={MdClose} color="teal.500" />
            </Button>
          </InputRightElement>
        </InputGroup>
        <List spacing={3}>
          {filteredDocuments.map((document, index) => (
            <ListItem key={index}>
              <VStack spacing={1} align="start">
                <Text>{document.name}</Text>
              </VStack>
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
}

export default Documents;
