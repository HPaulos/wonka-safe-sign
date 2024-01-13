import React from "react";
import { Container, Heading, Box, Grid, Flex } from "@chakra-ui/react";
import Documents from "../components/documents";
import Chat from "../components/chat";
import ProfileMenu from "../components/profileMenu";
import { colors } from "../styles.js"; // Import your style constants
function Home() {
  return (
    <React.StrictMode>
      <Container maxW="container.xl" p={4}>
        <Heading mb={6}>
          <Box
            bg={colors.primary}
            color={colors.white}
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
            <Flex
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Box ml={4} color={colors.headerTextColor}>Wonka Buster</Box>
              <ProfileMenu />
            </Flex>
          </Box>
        </Heading>
        <Grid templateColumns={{ sm: "1fr", md: "1fr 3fr" }} gap={6}>
          <Box height="80vh" bg={colors.tertiary}>
            <Documents />
          </Box>
          <Box bg={colors.tertiary} height="80vh">
            <Chat />
          </Box>
        </Grid>
        <Box
          bg={colors.primary}
          color={colors.headerTextColor}
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
    </React.StrictMode>
  );
}

export default Home;
