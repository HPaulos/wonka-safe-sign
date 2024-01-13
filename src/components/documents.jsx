import React, { useState, useRef } from "react";
import {
  Input,
  List,
  ListItem,
  Icon,
  Text,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Container,
  Box,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { MdSearch, MdClose, MdAdd } from "react-icons/md";
import { useDebouncedCallback } from "use-debounce";
import { Flex } from "@chakra-ui/react";
import {
  colors,
  buttonStyle,
  iconStyles,
  documentButtonStyle,
} from "../styles";

const documents = [
  { name: "Book 1", type: "pdf", size: 2.5, date: "2021-01-01" },
  { name: "Document 1", type: "docx", size: 1.5, date: "2021-01-02" },
  { name: "Text 1", type: "docx", size: 1.5, date: "2021-01-03" },
  { name: "Book 2", type: "txt", size: 2.5, date: "2021-01-04" },
  { name: "Document 2", type: "excel", size: 1.5, date: "2021-01-05" },
  // Add more documents here
];

function Documents() {
  const [search, setSearch] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

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

  // Function to trigger file input
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const filteredDocuments = documents.filter((document) =>
    document.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Process the file as needed, e.g., upload or add to the documents array
    }
  };

  return (
    <Box h="full" overflowY="auto" mt={2}>
      <Container maxW="container.md">
        <Box position="sticky" top={0} zIndex={1}>
          <InputGroup mb={6}>
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={MdSearch} color={colors.primary} />}
            />
            <Input
              placeholder="Type here to search..."
              value={inputValue}
              onChange={handleInputChange}
              borderColor={colors.primary}
              bg={colors.background}
            />
            <InputRightElement>
              <Button {...buttonStyle} onClick={clearSearch}>
                <Icon as={MdClose} />
              </Button>
            </InputRightElement>
          </InputGroup>
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />

          {/* Button to add new file */}
          <Button
            onClick={triggerFileInput}
            {...buttonStyle}
            width={"100%"}
            mb={4}
          >
            <Flex align="center">
              <Icon as={MdAdd} />
              <Text ml={2}>Add New File</Text>
            </Flex>
          </Button>
        </Box>
        <Box overflowY="auto" maxHeight="400px" mb={4}>
          <List>
            {filteredDocuments.map((doc) => (
              <ListItem key={doc.name}>
                <Tooltip
                  label={doc.date}
                  aria-label="A tooltip"
                  placement="auto-end"
                  openDelay={1000}
                >
                  <Button {...documentButtonStyle}>
                    <Flex align="center">
                      <Icon
                        as={
                          iconStyles[doc.type]?.icon ||
                          iconStyles["default"].icon
                        }
                        color={
                          iconStyles[doc.type]?.color ||
                          iconStyles["default"].color
                        }
                      />
                      <Text ml={2} noOfLines={1}>
                        {doc.name}
                      </Text>
                    </Flex>
                  </Button>
                </Tooltip>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </Box>
  );
}

export default Documents;
