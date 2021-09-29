import React from "react";
import { Flex as FlexBox, Text } from "@chakra-ui/react";

export const Footer = () => (
  <FlexBox
    flexDirection="column"
    bg="green.700"
    alignItems="center"
    px="32"
    py="4"
  >
    <Text>Made with ❤️ in Melbourne</Text>
    <Text>&#169; 2016 Brocolli n Co. All rights reserved.</Text>
  </FlexBox>
);
