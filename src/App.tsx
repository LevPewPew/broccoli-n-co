import React from "react";
import {
  ChakraProvider,
  Flex as FlexBox,
  Center,
  Container,
  theme,
  useDisclosure,
} from "@chakra-ui/react";
import {
  CallToAction,
  CompleteModal,
  Footer,
  Header,
  RequestInviteForm,
} from "components";

export const App = () => {
  const {
    isOpen: isRequestInviteFormOpen,
    onOpen: openRequestInviteForm,
    onClose: closeRequestInviteForm,
  } = useDisclosure();

  return (
    <ChakraProvider theme={theme}>
      <FlexBox color="white" height="100vh" flexDirection="column">
        <Header />
        <Center bg="green.500" flex="1">
          <Container maxW="xl" centerContent>
            <CallToAction onButtonClick={openRequestInviteForm} />
          </Container>
        </Center>
        <Footer />
      </FlexBox>
      <CompleteModal
        isOpen={isRequestInviteFormOpen}
        onClose={closeRequestInviteForm}
      >
        <RequestInviteForm onSubmit={closeRequestInviteForm} />
      </CompleteModal>
    </ChakraProvider>
  );
};
