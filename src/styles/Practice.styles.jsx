import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";

export const PracticePage = (props) => (
  <Box
    as="main"
    minH="calc(100vh - 68px)"
    px={{ base: "16px", md: "24px" }}
    py={{ base: "30px", md: "36px" }}
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
    marginBottom="24px"
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
    width={{ base: "35%", md: "152px" }}
    height="8px"
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
    minH="134px"
    padding="28px 20px"
    direction="column"
    align="center"
    justify="center"
    border="1px solid"
    borderColor="app.border.card"
    borderRadius={{ base: "14px", md: "18px" }}
    background="app.surface.card"
    textAlign="center"
    {...props}
  />
);

export const PracticeWord = (props) => (
  <Heading
    as="h1"
    color="app.text.heading"
    fontFamily="Georgia, serif"
    fontSize={{ base: "36px", md: "40px" }}
    fontWeight="600"
    letterSpacing="-0.035em"
    lineHeight="1"
    {...props}
  />
);

export const WordType = (props) => (
  <Text
    marginTop="12px"
    padding="3px 10px"
    borderRadius="8px"
    color="app.text.body"
    background="app.surface.hover"
    fontSize="12px"
    fontWeight="700"
    {...props}
  />
);

export const AnswerSection = (props) => (
  <Box as="section" marginTop="24px" {...props} />
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

const answerColors = {
  unanswered: { color: "app.text.default", background: "app.surface.card", border: "app.border.card" },
  correct: { color: "app.accent.text", background: "app.accent.subtle", border: "app.accent.text" },
  incorrect: { color: "app.reward.hover", background: "app.reward.subtle", border: "app.reward.default" },
  muted: { color: "app.text.subtle", background: "app.surface.card", border: "app.border.card" },
};

export const AnswerOption = ({ result = "unanswered", ...props }) => (
  <Button
    width="100%"
    minH="54px"
    height="auto"
    padding="14px"
    justifyContent="flex-start"
    gap="12px"
    border="1px solid"
    borderColor={answerColors[result].border}
    borderRadius="12px"
    color={answerColors[result].color}
    background={answerColors[result].background}
    fontWeight={result === "correct" || result === "incorrect" ? "700" : "400"}
    textAlign="left"
    whiteSpace="normal"
    cursor={result === "unanswered" ? "pointer" : "default"}
    _hover={result === "unanswered" ? { borderColor: "app.border.accent", background: "app.surface.hover" } : {}}
    _focusVisible={{ outline: "2px solid", outlineColor: "app.accent.text", outlineOffset: "3px" }}
    {...props}
  />
);

export const AnswerLetter = ({ result = "unanswered", ...props }) => (
  <Flex
    width="24px"
    height="24px"
    align="center"
    justify="center"
    flexShrink="0"
    borderRadius="6px"
    color={result === "correct" || result === "incorrect" ? "app.surface.card" : "inherit"}
    background={result === "correct" ? "app.action.default" : result === "incorrect" ? "app.reward.hover" : "app.surface.page"}
    fontSize="14px"
    fontWeight="700"
    {...props}
  />
);

export const AnswerText = (props) => (
  <Text fontSize="13px" lineHeight="1.5" {...props} />
);

export const PracticeFooter = ({ correct = false, ...props }) => (
  <Flex
    minH="96px"
    marginTop="24px"
    padding="18px"
    align="center"
    gap="18px"
    flexWrap={{ base: "wrap", sm: "nowrap" }}
    border="1px solid"
    borderColor={correct ? "app.border.accent" : "app.reward.default"}
    borderRadius="16px"
    background={correct ? "app.accent.subtle" : "app.reward.subtle"}
    {...props}
  />
);

export const FeedbackPet = (props) => (
  <Box flexShrink="0" width="54px" height="54px"
    css={{ "& img": { width: "100%", height: "100%", display: "block" } }} {...props} />
);

export const FeedbackCopy = (props) => <Box flex="1" minW="0" {...props} />;

export const FeedbackExample = (props) => (
  <Text marginTop="4px" color="app.text.default" fontSize="12px" lineHeight="1.6" {...props} />
);

export const AnswerFeedback = ({ correct = false, ...props }) => (
  <Text
    color={correct ? "app.accent.text" : "app.reward.hover"}
    fontSize="16px"
    fontWeight="700"
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
