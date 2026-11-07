import { useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import {
  DashboardEyebrow,
  DashboardMain,
  GoalCard,
  GoalCount,
  GoalDescription,
  GoalHeader,
  GoalTitle,
  OnboardingLeftColumn,
  OnboardingPage,
  OnboardingRightColumn,
  PathCard,
  PathItem,
  PathItemCopy,
  PathItemIcon,
  PathItemTitle,
  PetAction,
  PetArtwork,
  PetCard,
  PetDivider,
  PetHeading,
  PetText,
  PrimaryAction,
  ProgressFill,
  ProgressTrack,
  WelcomeCard,
  WelcomeHeading,
  WelcomeText,
} from "../styles/Onboarding.styles";
import { Maple } from "../components/Logos";
import { useAuth } from "../hooks/useAuth";
import { getRewards } from "../services/rewardsService";

const ArrowIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M4 10h11M11 5l5 5-5 5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CollectionPreview = ({ shelfItems, earnedAchievements }) => (
  <PathCard>
    <Flex align="center" justify="space-between" gap="12px" mb="18px">
      <Box>
        <DashboardEyebrow>Your collection</DashboardEyebrow>
        <GoalTitle mt="5px">Shelf & achievements</GoalTitle>
      </Box>
      <PetAction to="/rewards">
        View all <ArrowIcon />
      </PetAction>
    </Flex>

    <Box
      p="16px"
      borderRadius="14px"
      background="linear-gradient(180deg, #f8f1df 0%, #ead9b7 100%)"
      borderBottom="8px solid #76532e"
    >
      <Text
        mb="10px"
        color="#5e4828"
        fontSize="10px"
        fontWeight="800"
        letterSpacing="0.1em"
        textTransform="uppercase"
      >
        Word shelf
      </Text>
      <Flex minH="44px" align="flex-end" gap="10px" wrap="wrap">
        {shelfItems.length ? (
          shelfItems.slice(0, 7).map((reward) => (
            <Text
              key={reward.id}
              title={reward.name}
              fontSize="30px"
              filter="drop-shadow(0 3px 1px rgba(0,0,0,0.12))"
            >
              {reward.icon}
            </Text>
          ))
        ) : (
          <Text color="#76532e" fontSize="13px">
            Your first shelf item is waiting in Rewards.
          </Text>
        )}
      </Flex>
    </Box>

    <Flex mt="18px" gap="10px" wrap="wrap">
      {earnedAchievements.length ? (
        earnedAchievements.slice(0, 4).map((achievement) => (
          <Flex
            key={achievement.id}
            align="center"
            gap="7px"
            px="10px"
            py="7px"
            border="1px solid"
            borderColor="app.border.accent"
            borderRadius="999px"
            background="app.accent.subtle"
            title={achievement.description}
          >
            <Text fontSize="17px">{achievement.icon}</Text>
            <Text color="app.accent.text" fontSize="12px" fontWeight="700">
              {achievement.name}
            </Text>
          </Flex>
        ))
      ) : (
        <Text color="app.text.body" fontSize="13px">
          Complete a quiz to earn your first medal.
        </Text>
      )}
    </Flex>
  </PathCard>
);

const Onboarding = () => {
  const { user } = useAuth();
  const name = user?.name || user?.email?.split("@")[0] || "word explorer";
  const [rewards, setRewards] = useState(null);

  useEffect(() => {
    let active = true;
    getRewards()
      .then((data) => active && setRewards(data))
      .catch(() => active && setRewards(null));
    return () => {
      active = false;
    };
  }, []);

  const shelfItems = rewards?.rewards.filter((reward) => reward.unlocked) || [];
  const earnedAchievements =
    rewards?.achievements.filter((achievement) => achievement.unlocked) || [];

  return (
    <OnboardingPage>
      <DashboardMain>
        <OnboardingLeftColumn>
          <WelcomeCard>
            <DashboardEyebrow>Your learning home · day one</DashboardEyebrow>
            <WelcomeHeading>
              Welcome back, {name}. <span aria-hidden="true">👋</span>
            </WelcomeHeading>
            <WelcomeText>
              One thoughtful quiz is all it takes to keep your vocabulary
              moving. Pick up a new word, put it into context, and let Maple
              cheer you on.
            </WelcomeText>
            <PrimaryAction to="/quiz">
              Start today&apos;s quiz <ArrowIcon />
            </PrimaryAction>
          </WelcomeCard>

          <GoalCard>
            <GoalHeader>
              <GoalTitle>Daily Goal</GoalTitle>
              <GoalCount>0 / 5 words reviewed</GoalCount>
            </GoalHeader>
            <ProgressTrack
              role="progressbar"
              aria-label="Daily goal progress"
              aria-valuemin="0"
              aria-valuemax="5"
              aria-valuenow="0"
            >
              <ProgressFill />
            </ProgressTrack>
            <GoalDescription>
              Your next quiz is ready. Complete it to build recall, earn XP, and
              add a little more to your collection.
            </GoalDescription>
          </GoalCard>

          <PathCard>
            <DashboardEyebrow>Today&apos;s path</DashboardEyebrow>
            <PathItem>
              <PathItemIcon>01</PathItemIcon>
              <PathItemCopy>
                <PathItemTitle>Discover a word</PathItemTitle>Start with a
                concise meaning and an example you can remember.
              </PathItemCopy>
            </PathItem>
            <PathItem>
              <PathItemIcon>02</PathItemIcon>
              <PathItemCopy>
                <PathItemTitle>Test your recall</PathItemTitle>Use a short quiz
                to make the word stick.
              </PathItemCopy>
            </PathItem>
            <PathItem>
              <PathItemIcon>03</PathItemIcon>
              <PathItemCopy>
                <PathItemTitle>Collect your progress</PathItemTitle>Earn XP and
                points for the rewards waiting on your shelf.
              </PathItemCopy>
            </PathItem>
          </PathCard>
        </OnboardingLeftColumn>

        <OnboardingRightColumn>
          <PetCard id="companion">
            <PetArtwork>
              <Maple mood="maple" />
            </PetArtwork>
            <DashboardEyebrow>Your WordWell companion</DashboardEyebrow>
            <PetHeading>Meet Maple</PetHeading>
            <PetText>
              Maple is your guide through every word, quiz, and milestone—always
              here to make progress feel a little more meaningful.
            </PetText>
            <PetDivider />
            <PetAction to="/rewards">
              Explore your collection <ArrowIcon />
            </PetAction>
          </PetCard>
          <CollectionPreview
            shelfItems={shelfItems}
            earnedAchievements={earnedAchievements}
          />
        </OnboardingRightColumn>
      </DashboardMain>
    </OnboardingPage>
  );
};

export default Onboarding;
