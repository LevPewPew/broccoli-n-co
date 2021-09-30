import React from "react";
import { Box, Text, Input, VStack, Button } from "@chakra-ui/react";

interface Props {
  onSubmit: () => void;
}

export const RequestInviteForm = ({ onSubmit }: Props) => {
  const handleSendButtonClick = () => {
    // NEXT actually submit the form data
    console.log("the form data to start");
    onSubmit();
  };

  return (
    <Box>
      <VStack spacing="4">
        <Input placeholder="Full name" />
        <Input placeholder="Email" />
        <Input placeholder="Confirm email" />
        <Button onClick={handleSendButtonClick} width="100%">
          Send
        </Button>
      </VStack>
    </Box>
  );
};
