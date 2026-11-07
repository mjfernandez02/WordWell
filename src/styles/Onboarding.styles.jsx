import { Box, Flex, Grid, Heading, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const linkReset = {
  textDecoration: "none",
  _hover: { textDecoration: "none" },
};

export const OnboardingPage = (props) => (
  <Box
    minH="calc(100vh - 68px)"
    color="app.text.default"
    background="radial-gradient(circle at 85% 5%, #f4ead4 0%, transparent 28%), app.surface.page"
    {...props}
  />
);

export const DashboardMain = (props) => (
  <Grid
    as="main"
    width="100%"
    maxW="1314px"
    mx="auto"
    px={{ base: "16px", md: "32px" }}
    pt={{ base: "32px", md: "56px" }}
    pb="72px"
    gridTemplateColumns={{
      base: "1fr",
      lg: "minmax(0, 1.55fr) minmax(360px, 1fr)",
    }}
    gap={{ base: "28px", lg: "40px" }}
    alignItems="start"
    {...props}
  />
);

export const OnboardingLeftColumn = (props) => (
  <Grid gap={{ base: "22px", md: "30px" }} {...props} />
);

export const OnboardingRightColumn = (props) => (
  <Grid gap={{ base: "22px", md: "30px" }} {...props} />
);

export const DashboardCard = (props) => (
  <Box
    border="1px solid"
    borderColor="app.border.card"
    borderRadius={{ base: "14px", md: "18px" }}
    background="app.surface.card"
    boxShadow="0 12px 35px rgba(35, 55, 45, 0.07)"
    {...props}
  />
);

export const DashboardEyebrow = (props) => (
  <Text
    color="app.accent.text"
    fontSize="10px"
    fontWeight="800"
    letterSpacing="0.12em"
    textTransform="uppercase"
    {...props}
  />
);

export const WelcomeCard = (props) => (
  <DashboardCard
    height={{ base: "auto", md: "316px" }}
    position="relative"
    overflow="hidden"
    padding={{ base: "34px 26px", md: "50px" }}
    background="linear-gradient(135deg, #fffefb 0%, #f6f2e7 100%)"
    _after={{
      content: '""',
      position: "absolute",
      width: "180px",
      height: "180px",
      right: "-70px",
      top: "-75px",
      borderRadius: "full",
      background: "#e7f0e8",
      opacity: 0.8,
    }}
    {...props}
  />
);

export const WelcomeHeading = (props) => (
  <Heading
    as="h1"
    position="relative"
    zIndex="1"
    margin="12px 0 0"
    color="app.text.heading"
    fontFamily="Georgia, serif"
    fontSize={{ base: "34px", md: "42px" }}
    fontWeight="600"
    letterSpacing="-0.035em"
    lineHeight="1.1"
    {...props}
  />
);

export const WelcomeText = (props) => (
  <Text
    position="relative"
    zIndex="1"
    maxW="590px"
    margin={{ base: "15px 0 25px", md: "14px 0 28px" }}
    color="app.text.body"
    fontSize={{ base: "15px", md: "16px" }}
    lineHeight="1.7"
    {...props}
  />
);

export const PrimaryAction = (props) => (
  <Link
    asChild
    display="inline-flex"
    minH="40px"
    px="15px"
    alignItems="center"
    justifyContent="center"
    gap="8px"
    border="1px solid transparent"
    borderRadius="9px"
    color="white"
    background="app.action.default"
    fontSize="13px"
    fontWeight="700"
    position="relative"
    zIndex="1"
    boxShadow="0 8px 16px rgba(27, 94, 70, 0.18)"
    {...linkReset}
    _hover={{ background: "app.action.hover", textDecoration: "none" }}
  >
    <RouterLink {...props} />
  </Link>
);

export const GoalCard = (props) => (
  <DashboardCard
    minH={{ base: "auto", md: "205px" }}
    padding={{ base: "28px 24px", md: "38px 39px" }}
    {...props}
  />
);

export const GoalHeader = (props) => (
  <Flex
    align={{ base: "flex-start", sm: "center" }}
    justify="space-between"
    direction={{ base: "column", sm: "row" }}
    gap="6px"
    {...props}
  />
);

export const GoalTitle = (props) => (
  <Heading
    as="h2"
    color="app.text.heading"
    fontFamily="Georgia, serif"
    fontSize="20px"
    fontWeight="600"
    {...props}
  />
);

export const GoalCount = (props) => (
  <Text color="app.accent.text" fontSize="14px" fontWeight="700" {...props} />
);

export const ProgressTrack = (props) => (
  <Box
    height="12px"
    margin="20px 0 20px"
    overflow="hidden"
    borderRadius="999px"
    background="app.border.card"
    {...props}
  />
);

export const ProgressFill = (props) => (
  <Box
    width="4px"
    minW="4px"
    height="100%"
    borderRadius="999px"
    background="app.action.default"
    {...props}
  />
);

export const GoalDescription = (props) => (
  <Text color="app.text.body" fontSize="14px" lineHeight="1.6" {...props} />
);

export const PetCard = (props) => (
  <DashboardCard
    minH={{ base: "auto", lg: "485px" }}
    padding={{ base: "34px 24px", md: "46px 39px 40px" }}
    textAlign="center"
    background="linear-gradient(180deg, #fffdf8 0%, #fff 100%)"
    {...props}
  />
);

export const PetArtwork = (props) => (
  <Flex
    width="158px"
    height="158px"
    margin="0 auto 39px"
    align="center"
    justify="center"
    borderRadius="50%"
    background="radial-gradient(circle at 35% 30%, #fff4d8, #f0d9a7)"
    boxShadow="inset 0 0 0 8px rgba(255,255,255,0.55), 0 14px 26px rgba(104, 74, 30, 0.10)"
    css={{
      "& img": {
        display: "block",
        width: "140px",
        height: "140px",
        objectFit: "contain",
      },
    }}
    {...props}
  />
);

export const PetHeading = (props) => (
  <Heading
    as="h2"
    color="app.text.heading"
    fontFamily="Georgia, serif"
    fontSize={{ base: "24px", md: "27px" }}
    fontWeight="600"
    letterSpacing="-0.02em"
    {...props}
  />
);

export const PetText = (props) => (
  <Text
    maxW="350px"
    margin="7px auto 32px"
    color="app.text.body"
    fontSize="14px"
    lineHeight="1.6"
    {...props}
  />
);

export const PetDivider = (props) => (
  <Box height="1px" margin="0 0 30px" background="app.border.card" {...props} />
);

export const PetAction = (props) => (
  <Link
    asChild
    display="inline-flex"
    minH="40px"
    px="15px"
    alignItems="center"
    justifyContent="center"
    gap="8px"
    border="1px solid"
    borderColor="app.border.accent"
    borderRadius="9px"
    color="app.action.default"
    background="white"
    fontSize="13px"
    fontWeight="700"
    {...linkReset}
    _hover={{ background: "app.surface.hover", textDecoration: "none" }}
  >
    <RouterLink {...props} />
  </Link>
);

export const PathCard = (props) => (
  <DashboardCard padding={{ base: "28px 24px", md: "34px 39px" }} {...props} />
);

export const PathItem = (props) => (
  <Flex
    align="flex-start"
    gap="13px"
    py="15px"
    borderBottom="1px solid"
    borderColor="app.border.card"
    _last={{ borderBottom: "none", pb: 0 }}
    {...props}
  />
);

export const PathItemIcon = (props) => (
  <Flex
    flexShrink="0"
    width="30px"
    height="30px"
    align="center"
    justify="center"
    borderRadius="full"
    color="app.accent.text"
    background="app.accent.subtle"
    fontSize="10px"
    fontWeight="800"
    {...props}
  />
);

export const PathItemCopy = (props) => (
  <Text color="app.text.body" fontSize="13px" lineHeight="1.55" {...props} />
);
export const PathItemTitle = (props) => (
  <Text
    display="block"
    mb="2px"
    color="app.text.heading"
    fontSize="14px"
    fontWeight="750"
    {...props}
  />
);
