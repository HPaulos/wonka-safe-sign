import React, { useState } from "react";
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
import { MdSearch, MdClose } from "react-icons/md";
import { useDebouncedCallback } from "use-debounce";
import { MdDescription, MdPictureAsPdf, MdAttachFile } from "react-icons/md";
import { Flex } from "@chakra-ui/react";
import { FaFileAlt } from "react-icons/fa";

const documents = [
  { name: "Book 1", type: "pdf", size: 2.5, date: "2021-01-01" },
  { name: "Document 1", type: "docx", size: 1.5, date: "2021-01-02" },
  { name: "Text 1", type: "docx", size: 1.5, date: "2021-01-03" },
  { name: "Book 2", type: "txt", size: 2.5, date: "2021-01-04" },
  { name: "Document 2", type: "excel", size: 1.5, date: "2021-01-05" },
  // Add more documents here
];

const icons = {
  docx: { icon: MdDescription, color: "blue.500" },
  pdf: { icon: MdPictureAsPdf, color: "red.500" },
  txt: { icon: FaFileAlt, color: "gray.500" },
  default: {
    icon: MdAttachFile,
    color: "gray.400",
  },
};

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
            bg="white"
          />
          <InputRightElement>
            <Button variant="ghost" onClick={clearSearch}>
              <Icon as={MdClose} color="teal.500" />
            </Button>
          </InputRightElement>
        </InputGroup>
        <List>
          {filteredDocuments.map((doc) => (
            <ListItem>
              <Tooltip
                label={doc.date}
                aria-label="A tooltip"
                placement="auto-end"
                openDelay={1000}
              >
                <Button variant="ghost">
                  <Flex align="center">
                    <Icon
                      as={icons[doc.type]?.icon || icons["default"].icon}
                      color={icons[doc.type]?.color || icons["default"].color}
                    />{" "}
                    <Text ml={2} noOfLines={1}>
                      {doc.name}
                    </Text>
                  </Flex>
                </Button>
              </Tooltip>
            </ListItem>
          ))}
        </List>{" "}
      </Container>
    </Box>
  );
}

export default Documents;
