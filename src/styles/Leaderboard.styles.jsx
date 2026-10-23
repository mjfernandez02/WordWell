import { Box, Flex, Heading, Text } from "@chakra-ui/react";

export const LeaderboardPage = (props) => (
  <Box
    as="main"
    minH="calc(100vh - 68px)"
    px={{ base: "16px", md: "24px" }}
    py={{ base: "30px", md: "48px" }}
    color="app.text.default"
    background="app.surface.page"
    {...props}
  />
);

export const LeaderboardHeader = (props) => (
  <Box width="100%" maxW="900px" mx="auto" mb="24px" {...props}>
    <LeaderboardTitle>XP Leaderboard</LeaderboardTitle>
    <Text mt="8px" color="app.text.body">
      See how your vocabulary practice stacks up.
    </Text>
  </Box>
);

export const LeaderboardTitle = (props) => (
  <Heading
    as="h1"
    color="app.text.heading"
    fontFamily="Georgia, serif"
    fontSize={{ base: "32px", md: "40px" }}
    fontWeight="600"
    letterSpacing="-0.035em"
    {...props}
  />
);

export const LeaderboardCard = (props) => (
  <Box
    width="100%"
    maxW="900px"
    mx="auto"
    overflow="hidden"
    border="1px solid"
    borderColor="app.border.card"
    borderRadius="16px"
    background="app.surface.card"
    boxShadow="0 12px 35px rgba(35, 55, 45, 0.06)"
    {...props}
  />
);

export const LeaderboardEntry = ({
  header = false,
  current = false,
  ...props
}) => (
  <Flex
    minH="60px"
    px={{ base: "16px", md: "24px" }}
    py="12px"
    align="center"
    gap="12px"
    borderBottom="1px solid"
    borderColor="app.border.card"
    background={
      header
        ? "app.surface.hover"
        : current
          ? "app.accent.subtle"
          : "app.surface.card"
    }
    fontSize={header ? "12px" : "14px"}
    fontWeight={header || current ? "700" : "500"}
    {...props}
  />
);

export const LeaderboardRank = (props) => (
  <Text width="64px" flexShrink="0" color="app.accent.text" {...props} />
);

export const LeaderboardUser = (props) => (
  <Text flex="1" minW="0" overflow="hidden" textOverflow="ellipsis" {...props} />
);

export const LeaderboardXp = (props) => (
  <Text flexShrink="0" color="app.text.body" textAlign="right" {...props} />
);
