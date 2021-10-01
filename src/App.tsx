import React, { useState } from "react";
import {
  ChakraProvider,
  Flex as FlexBox,
  Center,
  Container,
  Text,
  Alert,
  AlertIcon,
  useDisclosure,
  theme,
} from "@chakra-ui/react";
import {
  CallToAction,
  CompleteModal,
  Footer,
  Header,
  InviteForm,
} from "components";
import { FormValues } from "components/InviteForm";
import { postFormData } from "api/requests";

export const App = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    isOpen: isInviteFormOpen,
    onOpen: openInviteForm,
    onClose: closeInviteForm,
  } = useDisclosure();
  const {
    isOpen: isInviteSuccessOpen,
    onOpen: openInviteSuccess,
    onClose: closeInviteSuccess,
  } = useDisclosure();

  const handleOkResponse = () => {
    closeInviteForm();
    openInviteSuccess();
  };

  const handleModalClose = () => {
    closeInviteForm();
    setSubmitError(null);
  };

  return (
    <ChakraProvider theme={theme}>
      <FlexBox color="white" height="100vh" flexDirection="column">
        <Header />
        <Center bg="green.600" flex="1">
          <Container maxW="xl" centerContent>
            <CallToAction onButtonClick={openInviteForm} />
          </Container>
        </Center>
        <Footer />
      </FlexBox>
      <CompleteModal
        title="Request an Invite"
        isOpen={isInviteFormOpen}
        onClose={handleModalClose}
      >
        <InviteForm
          onSubmit={(values: FormValues) =>
            postFormData(values, handleOkResponse, setSubmitError)
          }
        />
        {submitError && (
          <Alert status="error" borderRadius="0.4rem" mt={4}>
            <AlertIcon />
            {submitError}
          </Alert>
        )}
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
