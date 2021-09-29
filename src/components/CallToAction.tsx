import React from "react";
import { VStack, Heading, Text, Button } from "@chakra-ui/react";

export const CallToAction = () => (
  <VStack spacing="4">
    <Heading size="3xl" textAlign="center">
      A better way
      <br />
      to enjoy every day.
    </Heading>
    <Text fontSize="xl">Be the first to know when we launch.</Text>
    <Button size="lg">Request an invite</Button>
  </VStack>
);
