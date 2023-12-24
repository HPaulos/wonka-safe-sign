import React from "react";
import { Container, Heading, Box, Grid, Flex } from "@chakra-ui/react";
import Documents from "./documents";
import Chat from "./chat";
import ProfileMenu from "./profileMenu";

function Home() {
  return (
    <Container maxW="container.xl" p={4}>
      <Heading mb={6}>
        <Box
          bg="teal.500"
          color="white"
          p={2}
          textAlign="center"
          fontWeight="bold"
          position="sticky"
          top="0"
          zIndex="999"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Flex alignItems="center" justifyContent="space-between" width="100%">
            <Box ml={4}>Wonka Buster</Box>
            <ProfileMenu />
          </Flex>
        </Box>
      </Heading>
      <Grid templateColumns="1fr 3fr" gap={6}>
        <Box bg="gray.200" height="80vh">
          <Documents />
        </Box>
        <Box bg="gray.300" height="80vh">
          <Chat />
        </Box>
      </Grid>
      <Box
        bg="teal.500"
        color="white"
        p={2}
        textAlign="center"
        fontWeight="bold"
        position="sticky"
        bottom="0"
        zIndex="999"
      >
        Wonka Buster
      </Box>
    </Container>
  );
}

export default Home;
