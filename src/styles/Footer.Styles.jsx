import { Box, Flex, Link as ChakraLink, HStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const HomeFooter = (props) => (
  <Box
    as="footer"
    h="-moz-fit-content"
    width="100%"
    py="20px"
    px="24px"
    borderTop="1px solid #e1e6df"
    mt="auto"
    {...props}
  />
);

export const FooterContent = (props) => (
  <Flex
    maxW="1050px"
    mx="auto"
    direction={{ base: "column", md: "row" }}
    justify="space-between"
    align="center"
    gap="20px"
    {...props}
  />
);

export const FooterLinks = (props) => (
  <HStack gap="20px" wrap="wrap" justify="center" {...props} />
);

export const FooterLink = (props) => (
  <ChakraLink
    asChild
    fontSize="13px"
    color="#69756f"
    fontWeight="500"
    textDecoration="none"
    _hover={{ color: "#185b46", textDecoration: "underline" }}
  >
    <RouterLink {...props} />
  </ChakraLink>
);

export const CreatedBy = (props) => (
  <HStack
    justify="center"
    align="center"
    wrap="wrap"
    gap=".4rem"
    color="#69756f"
    fontSize={{ base: "md", sm: "sm" }}
    lineHeight="1.6"
    textAlign="center"
    {...props}
  />
);

export const CreatedByLink = (props) => (
  <ChakraLink
    alignItems="center"
    justifyContent="center"
    gap="8px"
    color="#185b46"
    fontWeight="600"
    textDecoration="none"
    _hover={{ textDecoration: "underline" }}
    isExternal
    whiteSpace={{ base: "normal", sm: "nowrap" }}
    {...props}
  />
);
