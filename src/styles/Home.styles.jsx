import {
  Box,
  Flex,
  Grid,
  Heading,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const orbitPlacements = {
  one: {
    top: "22%",
    left: { base: "24px", lg: "7vw", "2xl": "120px" },
    animationDuration: "8s",
    animationDelay: "-1s",
  },
  two: {
    top: "28%",
    right: { base: "24px", lg: "6vw", "2xl": "110px" },
    animationDuration: "10s",
    animationDelay: "-4s",
  },
  three: {
    bottom: "20%",
    left: { base: "30px", lg: "12vw", "2xl": "210px" },
    animationDuration: "9s",
    animationDelay: "-6s",
  },
};

export const HomePage = (props) => (
  <Flex as="main" direction="column" overflow="hidden" {...props} />
);

export const HomeHero = (props) => (
  <Flex
    as="section"
    position="relative"
    minH={{ base: "520px", md: "560px" }}
    px="24px"
    pt={{ base: "72px", md: "100px" }}
    pb="160px"
    direction="column"
    align="center"
    textAlign="center"
    {...props}
  />
);

export const HeroSeal = (props) => (
  <Flex
    position="relative"
    zIndex="1"
    width="fit-content"
    margin="0 auto 24px"
    padding="7px 12px"
    align="center"
    gap="7px"
    border="1px solid #cfd9d1"
    borderRadius="999px"
    color="#2b6a55"
    background="#eff5ef"
    fontSize="12px"
    fontWeight="700"
    {...props}
  />
);

export const HeroHeading = (props) => (
  <Heading
    position="relative"
    zIndex="1"
    maxW="850px"
    margin="0 auto"
    color="#223129"
    fontStyle="normal"
    fontFamily="Georgia, serif"
    fontSize={{ base: "44px", sm: "46px", md: "54px", lg: "72px", xl: "78px" }}
    fontWeight="600"
    letterSpacing="-0.04em"
    lineHeight="1"
    css={{
      "& em": {
        color: "#287058",
        fontWeight: "500",
        fontStyle: "italic",
      },
    }}
    {...props}
  />
);

export const HeroParagraph = (props) => (
  <Text
    position="relative"
    zIndex="1"
    maxW="560px"
    margin="24px auto 30px"
    color="#66736c"
    lineHeight="1.7"
    {...props}
  />
);

export const HeroActions = (props) => (
  <Flex
    position="relative"
    zIndex="1"
    justify="center"
    gap="10px"
    wrap="wrap"
    {...props}
  />
);

const landingLinkStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  minH: "40px",
  padding: "0 15px",
  border: "1px solid transparent",
  borderRadius: "9px",
  fontSize: "13px",
  fontWeight: "700",
  textDecoration: "none",
};

export const LandingPrimary = (props) => (
  <ChakraLink
    asChild
    {...landingLinkStyles}
    color="white"
    background="#185b46"
    _hover={{ background: "#104a38", textDecoration: "none" }}
  >
    <RouterLink {...props} />
  </ChakraLink>
);

export const LandingSecondary = (props) => (
  <ChakraLink
    asChild
    {...landingLinkStyles}
    color="inherit"
    background="transparent"
    _hover={{ background: "#edf1e9", textDecoration: "none" }}
  >
    <RouterLink {...props} />
  </ChakraLink>
);

export const WordOrbit = (props) => (
  <Box
    position="absolute"
    zIndex="0"
    inset="0"
    display={{ base: "none", lg: "block" }}
    pointerEvents="none"
    {...props}
  />
);

export const OrbitWord = ({ placement = "one", ...props }) => (
  <Text
    position="absolute"
    width="max-content"
    maxW="210px"
    padding="12px 16px"
    borderWidth="1px"
    borderStyle="solid"
    borderColor="app.border.accent"
    borderRadius="12px"
    color="app.accent.text"
    background="app.surface.card"
    boxShadow="0 12px 35px rgba(35, 55, 45, 0.08)"
    fontFamily="Georgia, serif"
    fontSize="18px"
    fontWeight="600"
    lineHeight="1.2"
    textAlign="left"
    animationName="orbitFloat"
    animationTimingFunction="ease-in-out"
    animationIterationCount="infinite"
    willChange="transform"
    css={{
      "& small": {
        display: "block",
        marginTop: "4px",
        color: "app.text.muted",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        fontSize: "10px",
        fontWeight: "500",
        letterSpacing: "0.01em",
      },
      "@media (prefers-reduced-motion: reduce)": {
        animation: "none",
      },
    }}
    {...orbitPlacements[placement]}
    {...props}
  />
);

export const HomeFeatures = (props) => (
  <Grid
    as="section"
    width="100%"
    maxW="1050px"
    mx="auto"
    mt={{ base: "-60px", md: "-85px" }}
    mb="0"
    padding="0 24px 64px"
    gridTemplateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
    gap="12px"
    {...props}
  />
);

export const FeatureCard = (props) => (
  <Box
    as="article"
    padding="28px"
    border="1px solid #e1e6df"
    borderRadius="14px"
    background="white"
    {...props}
  />
);

export const FeatureNumber = (props) => (
  <Text color="#87928c" fontSize="11px" {...props} />
);

export const FeatureHeading = (props) => (
  <Heading
    margin="2rem 0 0"
    fontFamily="Georgia, serif"
    fontSize="21px"
    fontWeight="600"
    {...props}
  />
);

export const FeatureText = (props) => (
  <Text
    margin="0"
    color="#69756f"
    fontSize="14px"
    lineHeight="1.6"
    {...props}
  />
);

export const CreatedBy = (props) => (
  <Flex
    width="100%"
    justify="center"
    align="center"
    wrap="wrap"
    gap=".4rem"
    mb="2rem"
    color="#69756f"
    fontSize={{ base: "md", sm: "sm" }}
    lineHeight="1.6"
    textAlign="center"
    {...props}
  />
);

export const CreatedByLink = (props) => (
  <ChakraLink
    display="inline-flex"
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
