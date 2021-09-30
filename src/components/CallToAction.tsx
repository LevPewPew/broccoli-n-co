import React from "react";
import { VStack, Heading, Text, Button } from "@chakra-ui/react";

interface Props {
  onButtonClick: () => void;
}

export const CallToAction = ({ onButtonClick }: Props) => (
  <VStack spacing={4}>
    <Heading size="3xl" textAlign="center">
      A better way
      <br />
      to enjoy every day.
    </Heading>
    <Text fontSize="xl">Be the first to know when we launch.</Text>
    <Button onClick={onButtonClick} size="lg" colorScheme="green">
      Request an invite
    </Button>
  </VStack>
);
