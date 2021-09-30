import React from "react";
import {
  ChakraProvider,
  Flex as FlexBox,
  Center,
  Container,
  Text,
  useDisclosure,
  theme,
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
  const {
    isOpen: isInviteSuccessOpen,
    onOpen: openInviteSuccess,
    onClose: closeInviteSuccess,
  } = useDisclosure();

  // NEXT change RequestInvite to Invite over entire app
  const handleRequestInviteFormSubmit = () => {
    closeRequestInviteForm();
    openInviteSuccess();
  };

  // NEXT ensure everything is responsive
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
        title="Request an Invite"
        isOpen={isRequestInviteFormOpen}
        onClose={closeRequestInviteForm}
      >
        <RequestInviteForm onSubmit={handleRequestInviteFormSubmit} />
      </CompleteModal>
      <CompleteModal
        title="All done!"
        isOpen={isInviteSuccessOpen}
        onClose={closeInviteSuccess}
        confirm
      >
        <Text textAlign="center">
          You will be one of the first to experience Broccoli &#38; Co. when we
          launch.
        </Text>
      </CompleteModal>
    </ChakraProvider>
  );
};
