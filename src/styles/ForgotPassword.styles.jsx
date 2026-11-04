import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { LoginCard } from "./Login.styles";

export const ForgotPasswordContainer = (props) => (
  <Flex
    as="main"
    display="flex"
    justifyContent="center"
    alignItems="center"
    minH="100vh"
    background="var(--bg-color)"
    {...props}
  />
);

export const ForgotPasswordCard = (props) => (
  <Box
    as={LoginCard}
    maxWidth="400px"
    width="100%"
    {...props}
  />
);

export const ForgotPasswordTitle = (props) => (
  <Heading
    fontSize="24px"
    fontWeight="bold"
    marginBottom="16px"
    textAlign="center"
    color="var(--text-color)"
    {...props}
  />
);

export const ForgotPasswordText = (props) => (
  <Text
    fontSize="14px"
    marginBottom="24px"
    textAlign="center"
    color="var(--text-secondary)"
    {...props}
  />
);
