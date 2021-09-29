import React from "react";
import {
  ChakraProvider,
  Flex as FlexBox,
  Center,
  Container,
  theme,
} from "@chakra-ui/react";
import { CallToAction, Footer, Header } from "components";

export const App = () => (
  <ChakraProvider theme={theme}>
    <FlexBox color="white" height="100vh" flexDirection="column">
      <Header />
      <Center bg="green.500" flex="1">
        <Container maxW="xl" centerContent>
          <CallToAction />
        </Container>
      </Center>
      <Footer />
    </FlexBox>
  </ChakraProvider>
);
