import React from "react";
import { Flex as FlexBox, Text } from "@chakra-ui/react";

export const Footer = () => (
  <FlexBox
    flexDirection="column"
    bg="green.800"
    alignItems="center"
    px={[8, 16, 32]}
    py={[2, 4, 8]}
  >
    <Text textAlign="center">Made with ❤️ in Melbourne</Text>
    <Text textAlign="center">
      &#169; 2016 Broccoli n Co. All rights reserved.
    </Text>
  </FlexBox>
);
