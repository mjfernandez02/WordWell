import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

export const PracticePage = (props) => (
  <Box
    as="main"
    minH="calc(100vh - 68px)"
    px={{ base: "16px", md: "24px" }}
    py={{ base: "34px", md: "56px" }}
    color="app.text.default"
    background="app.surface.page"
    {...props}
  />
);

export const PracticeContent = (props) => (
  <Box width="100%" maxW="1000px" mx="auto" {...props} />
);

export const PracticeProgressHeader = (props) => (
  <Flex
    marginBottom={{ base: "28px", md: "40px" }}
    align="center"
    justify="space-between"
    gap="24px"
    {...props}
  />
);

export const QuestionCounter = (props) => (
  <Text
    color="app.text.body"
    fontSize={{ base: "13px", md: "14px" }}
    fontWeight="700"
    whiteSpace="nowrap"
    {...props}
  />
);

export const QuestionProgressTrack = (props) => (
  <Box
    width={{ base: "45%", md: "250px" }}
    height="12px"
    overflow="hidden"
    borderRadius="999px"
    background="app.border.card"
    {...props}
  />
);

export const QuestionProgressFill = (props) => (
  <Box
    height="100%"
    borderRadius="999px"
    background="app.action.default"
    transition="width 220ms ease"
    {...props}
  />
);

export const WordCard = (props) => (
  <Flex
    minH={{ base: "180px", md: "220px" }}
    padding={{ base: "34px 20px", md: "48px" }}
    direction="column"
    align="center"
    justify="center"
    border="1px solid"
    borderColor="app.border.card"
    borderRadius={{ base: "14px", md: "18px" }}
    background="app.surface.card"
    boxShadow="0 12px 35px rgba(35, 55, 45, 0.05)"
    textAlign="center"
    {...props}
  />
);

export const PracticeWord = (props) => (
  <Heading
    as="h1"
    color="app.text.heading"
    fontFamily="Georgia, serif"
    fontSize={{ base: "42px", md: "56px" }}
    fontWeight="600"
    letterSpacing="-0.035em"
    lineHeight="1"
    {...props}
  />
);

export const WordType = (props) => (
  <Text
    marginTop="20px"
    padding="5px 12px"
    borderRadius="8px"
    color="app.text.body"
    background="app.surface.hover"
    fontSize="12px"
    fontWeight="700"
    {...props}
  />
);

export const AnswerSection = (props) => (
  <Box as="section" marginTop={{ base: "34px", md: "40px" }} {...props} />
);

export const AnswerPrompt = (props) => (
  <Heading
    as="h2"
    marginBottom="18px"
    color="app.text.heading"
    fontFamily="Georgia, serif"
    fontSize={{ base: "18px", md: "20px" }}
    fontWeight="600"
    {...props}
  />
);

export const AnswerList = (props) => (
  <Flex direction="column" gap="12px" {...props} />
);

export const AnswerOption = ({ selected = false, ...props }) => (
  <Button
    width="100%"
    minH={{ base: "76px", md: "88px" }}
    height="auto"
    padding={{ base: "14px", md: "18px 22px" }}
    justifyContent="flex-start"
    gap={{ base: "14px", md: "20px" }}
    border="1px solid"
    borderColor={selected ? "app.border.accent" : "app.border.card"}
    borderRadius={{ base: "12px", md: "14px" }}
    color="app.text.default"
    background={selected ? "app.surface.hover" : "app.surface.card"}
    boxShadow={selected ? "0 0 0 2px rgba(43, 106, 85, 0.08)" : "none"}
    fontWeight="400"
    textAlign="left"
    whiteSpace="normal"
    transition="border-color 150ms ease, background 150ms ease"
    _hover={{
      borderColor: "app.border.accent",
      background: "app.surface.hover",
    }}
    _focusVisible={{
      outline: "3px solid rgba(40, 112, 88, 0.2)",
      outlineOffset: "2px",
    }}
    {...props}
  />
);

export const AnswerLetter = (props) => (
  <Flex
    width="40px"
    height="40px"
    align="center"
    justify="center"
    flexShrink="0"
    borderRadius="9px"
    color="app.text.heading"
    background="app.surface.page"
    fontSize="14px"
    fontWeight="700"
    {...props}
  />
);

export const AnswerText = (props) => (
  <Text fontSize={{ base: "14px", md: "16px" }} lineHeight="1.5" {...props} />
);

export const PracticeFooter = (props) => (
  <Flex
    minH="54px"
    marginTop="20px"
    align="center"
    justify="space-between"
    gap="18px"
    {...props}
  />
);

export const AnswerFeedback = ({ correct = false, ...props }) => (
  <Text
    color={correct ? "app.accent.text" : "app.text.body"}
    fontSize="14px"
    fontWeight="600"
    {...props}
  />
);

export const ContinueButton = (props) => (
  <Button
    minH="40px"
    padding="0 15px"
    flexShrink="0"
    border="1px solid transparent"
    borderRadius="9px"
    color="white"
    background="app.action.default"
    fontSize="13px"
    fontWeight="700"
    _hover={{ background: "app.action.hover" }}
    {...props}
  />
);

export const CompletionCard = (props) => (
  <Flex
    width="100%"
    maxW="532px"
    mx="auto"
    padding={{ base: "28px 20px", sm: "36px" }}
    direction="column"
    align="center"
    border="1px solid"
    borderColor="app.border.card"
    borderRadius="24px"
    background="app.surface.card"
    textAlign="center"
    {...props}
  />
);

export const CompletionHeading = (props) => (
  <Heading
    as="h1"
    color="app.text.heading"
    fontSize={{ base: "24px", sm: "28px" }}
    fontWeight="700"
    lineHeight="1.2"
    {...props}
  />
);

export const CompletionText = (props) => (
  <Text
    margin="8px 0 24px"
    color="app.text.body"
    fontSize="14px"
    lineHeight="1.5"
    {...props}
  />
);

export const CompletionScore = (props) => (
  <Text as="strong" color="app.accent.text" fontWeight="700" {...props} />
);

export const CompletionRewards = (props) => (
  <Flex width="100%" gap="18px" {...props} />
);

export const CompletionReward = ({ reward = false, ...props }) => (
  <Flex
    flex="1"
    minW="0"
    minH="100px"
    padding="14px 8px"
    direction="column"
    align="center"
    justify="center"
    gap="6px"
    border="1px solid"
    borderColor={reward ? "app.reward.default" : "app.border.accent"}
    borderRadius="12px"
    color={reward ? "app.reward.default" : "app.accent.text"}
    background={reward ? "app.reward.subtle" : "app.accent.subtle"}
    {...props}
  />
);

export const RewardIcon = ({ source, ...props }) => (
  <Box
    aria-hidden="true"
    width="18px"
    height="18px"
    background="currentColor"
    style={{ mask: `url("${source}") center / contain no-repeat` }}
    {...props}
  />
);

export const RewardValue = (props) => (
  <Text
    fontSize={{ base: "18px", sm: "20px" }}
    fontWeight="700"
    lineHeight="1.2"
    {...props}
  />
);

export const RewardLabel = (props) => (
  <Text color="app.text.muted" fontSize="11px" {...props} />
);

export const CompletionActions = (props) => (
  <Box
    display="grid"
    gridTemplateColumns={{ base: "1fr", sm: "1fr 1fr" }}
    width="100%"
    marginTop="24px"
    gap="12px"
    {...props}
  />
);

export const VisitPetButton = (props) => (
  <Button
    width="100%"
    minH="40px"
    border="1px solid"
    borderColor="app.reward.default"
    borderRadius="12px"
    color="app.reward.default"
    background="app.surface.card"
    fontSize="13px"
    fontWeight="700"
    _hover={{ background: "app.reward.subtle" }}
    {...props}
  />
);
