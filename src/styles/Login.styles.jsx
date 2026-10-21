import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export const LoginPage = (props) => (
  <Flex
    as="main"
    position="relative"
    minH="calc(100vh - 68px)"
    padding={{ base: "36px 14px 40px", md: "70px 20px" }}
    align="start"
    justify="center"
    overflow="hidden"
    isolation="isolate"
    {...props}
  />
);

export const LoginGrid = (props) => (
  <Box
    position="absolute"
    inset="0"
    zIndex="-2"
    opacity="0.45"
    backgroundImage="radial-gradient(circle, rgba(24, 91, 70, 0.14) 1px, transparent 1px)"
    backgroundSize="30px 30px"
    {...props}
  />
);

export const LoginOrb = (props) => (
  <Box
    position="absolute"
    top="-110px"
    left="-90px"
    zIndex="-1"
    width="260px"
    aspectRatio="1"
    border="1px solid rgba(43, 106, 85, 0.18)"
    borderRadius="50%"
    background="rgba(170, 211, 189, 0.3)"
    pointerEvents="none"
    {...props}
  />
);

export const LoginCard = (props) => (
  <Box
    width="min(100%, 440px)"
    padding={{ base: "28px 22px", md: "44px" }}
    border="1px solid #e0e5de"
    borderRadius="18px"
    background="rgba(255, 255, 255, 0.96)"
    boxShadow="0 20px 60px rgba(35, 55, 45, 0.1)"
    {...props}
  />
);

export const LoginBadge = (props) => (
  <Flex
    align="center"
    gap="8px"
    color="#287058"
    fontSize="12px"
    fontWeight="700"
    {...props}
  />
);

export const LoginBadgeDot = (props) => (
  <Box
    width="7px"
    height="7px"
    borderRadius="50%"
    background="#43a37c"
    {...props}
  />
);

export const LoginTitle = (props) => (
  <Heading
    margin="18px 0 8px"
    color="#24312b"
    fontFamily="Georgia, serif"
    fontSize={{ base: "31px", md: "36px" }}
    fontWeight="600"
    {...props}
  />
);

export const LoginSubtitle = (props) => (
  <Text margin="0 0 28px" color="#6b7770" lineHeight="1.6" {...props} />
);

export const LoginAlert = (props) => (
  <Flex
    marginBottom="18px"
    padding="11px 13px"
    align="flex-start"
    gap="8px"
    borderRadius="8px"
    color="#8d3128"
    background="#fbe9e7"
    fontSize="13px"
    {...props}
  />
);

export const LoginField = (props) => <Box marginBottom="18px" {...props} />;

export const LoginLabel = (props) => (
  <Text
    display="block"
    marginBottom="7px"
    fontSize="13px"
    fontWeight="700"
    {...props}
  />
);

export const LoginInput = (props) => (
  <Input
    width="100%"
    minH="46px"
    padding="0 13px"
    border="1px solid #cfd7d1"
    borderRadius="9px"
    color="#24312b"
    background="white"
    _focus={{
      borderColor: "#287058",
      boxShadow: "0 0 0 3px rgba(40, 112, 88, 0.13)",
    }}
    {...props}
  />
);

export const LoginPasswordField = (props) => (
  <Box position="relative" {...props} />
);

export const LoginPasswordToggle = (props) => (
  <Button
    position="absolute"
    top="50%"
    right="4px"
    transform="translateY(-50%)"
    minH="36px"
    paddingX="10px"
    color="#287058"
    background="transparent"
    fontSize="13px"
    _hover={{ background: "#eef5f1" }}
    {...props}
  />
);

export const LoginFieldError = (props) => (
  <Text marginTop="6px" color="#b00020" fontSize="12px" {...props} />
);

export const LoginSubmit = (props) => (
  <Button
    width="100%"
    minH="46px"
    borderRadius="9px"
    color="white"
    background="#185b46"
    fontWeight="700"
    _hover={{ background: "#104a38" }}
    {...props}
  />
);

export const LoginDivider = (props) => (
  <Box height="1px" margin="26px 0 20px" background="#e5e9e4" {...props} />
);

export const LoginFooter = (props) => (
  <Text
    margin="0"
    color="#707b75"
    textAlign="center"
    fontSize="13px"
    {...props}
  />
);

export const LoginFooterLink = (props) => (
  <Link
    asChild
    color="#185b46"
    fontWeight="700"
    _hover={{ color: "#104a38" }}
    {...props}
  >
    <RouterLink {...props} />
  </Link>
);
