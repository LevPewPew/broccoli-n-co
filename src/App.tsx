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

  // NEXT maybe extract this into api utility or something
  const postFormData = async (values: FormValues) => {
    // NEXT test if values are correct to the interface
    setSubmitError(null);

    const authEndpoint =
      "https://us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth";
    const authBody = {
      name: values.fullName,
      email: values.email,
    };

    try {
      const response = await fetch(authEndpoint, {
        method: "POST",
        body: JSON.stringify(authBody),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        closeInviteForm();
        openInviteSuccess();
      } else {
        const data = await response.json();
        setSubmitError(data.errorMessage);
      }
    } catch (error) {
      setSubmitError(error);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <FlexBox color="white" height="100vh" flexDirection="column">
        <Header />
        <Center bg="green.500" flex="1">
          <Container maxW="xl" centerContent>
            <CallToAction onButtonClick={openInviteForm} />
          </Container>
        </Center>
        <Footer />
      </FlexBox>
      <CompleteModal
        title="Request an Invite"
        isOpen={isInviteFormOpen}
        onClose={closeInviteForm}
      >
        <InviteForm onSubmit={postFormData} />
        {submitError && (
          <Alert status="error" borderRadius="0.4rem">
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
