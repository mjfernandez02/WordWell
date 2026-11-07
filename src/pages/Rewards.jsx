import { useEffect, useState } from "react";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useAuth } from "../hooks/useAuth";
import { getRewards, unlockReward } from "../services/rewardsService";

const medalStyles = {
  starter: {
    background: "linear-gradient(135deg, #f5ead4, #d9c4a1)",
    border: "#b99c6d",
    color: "#654720",
  },
  bronze: {
    background: "linear-gradient(135deg, #f3d0b1, #bd7043)",
    border: "#98502b",
    color: "#623115",
  },
  silver: {
    background: "linear-gradient(135deg, #ffffff, #b8c3ce)",
    border: "#8c99a4",
    color: "#40505d",
  },
  gold: {
    background: "linear-gradient(135deg, #fff3ae, #d69b24)",
    border: "#ad7314",
    color: "#684100",
  },
  platinum: {
    background: "linear-gradient(135deg, #e8ffff, #76bac0)",
    border: "#43898f",
    color: "#17545a",
  },
  diamond: {
    background: "linear-gradient(135deg, #f5efff, #aa8bd2)",
    border: "#8063ac",
    color: "#4d3971",
  },
  master: {
    background: "linear-gradient(135deg, #ffe5aa, #e07935)",
    border: "#a94d1e",
    color: "#69270e",
  },
  legend: {
    background: "linear-gradient(135deg, #ffe4f2, #bd4d8f)",
    border: "#943063",
    color: "#641137",
  },
  legacy: {
    background: "linear-gradient(135deg, #d9ecff, #5368b8)",
    border: "#354588",
    color: "#1d2860",
  },
};

const Rewards = () => {
  const { user, updateProgress } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");
  const [unlockingId, setUnlockingId] = useState("");

  const load = async () => {
    try {
      setError("");
      setDashboard(await getRewards());
    } catch (requestError) {
      setError(requestError.message);
    }
  };

  useEffect(() => {
    let active = true;
    getRewards()
      .then((data) => {
        if (active) setDashboard(data);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleUnlock = async (rewardId) => {
    setUnlockingId(rewardId);
    setError("");
    try {
      const result = await unlockReward(rewardId);
      updateProgress({ xp: user?.xp ?? 0, points: result.points });
      await load();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setUnlockingId("");
    }
  };

  if (!dashboard && !error) {
    return (
      <Box as="main" minH="calc(100vh - 68px)" p="40px" textAlign="center">
        Loading your rewards…
      </Box>
    );
  }

  return (
    <Box
      as="main"
      minH="calc(100vh - 68px)"
      px={{ base: "16px", md: "24px" }}
      py={{ base: "30px", md: "40px" }}
      background="app.surface.page"
    >
      <Box maxW="1000px" mx="auto">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          gap="16px"
          mb="28px"
        >
          <Box>
            <Heading
              color="app.text.heading"
              fontFamily="Georgia, serif"
              fontSize={{ base: "30px", md: "38px" }}
            >
              Your Word Shelf
            </Heading>
            <Text mt="6px" color="app.text.body">
              Spend points to collect a study space that grows with you.
            </Text>
          </Box>
          <Box
            px="18px"
            py="10px"
            borderRadius="999px"
            background="app.reward.subtle"
            color="app.reward.default"
            fontWeight="700"
          >
            {dashboard?.points ?? user?.points ?? 0} points
          </Box>
        </Flex>

        {error && (
          <Box
            mb="20px"
            p="12px"
            borderRadius="10px"
            background="red.50"
            color="red.700"
            role="alert"
          >
            {error}
          </Box>
        )}

        <Box
          p={{ base: "20px", md: "28px" }}
          mb="30px"
          border="1px solid"
          borderColor="app.border.card"
          borderRadius="20px"
          background="linear-gradient(180deg, #f8f1df 0%, #e7d1a5 100%)"
          boxShadow="0 14px 30px rgba(65, 48, 22, 0.12)"
        >
          <Text
            mb="14px"
            color="#5e4828"
            fontSize="12px"
            fontWeight="800"
            letterSpacing="0.12em"
            textTransform="uppercase"
          >
            Your collection
          </Text>
          <Flex
            minH="128px"
            align="flex-end"
            gap={{ base: "10px", md: "18px" }}
            px="16px"
            py="16px"
            borderBottom="12px solid #76532e"
            flexWrap="wrap"
          >
            {dashboard?.rewards.filter((reward) => reward.unlocked).length ? (
              dashboard.rewards
                .filter((reward) => reward.unlocked)
                .map((reward) => (
                  <Box
                    key={reward.id}
                    title={reward.name}
                    fontSize={{ base: "34px", md: "46px" }}
                    filter="drop-shadow(0 4px 2px rgba(0,0,0,0.14))"
                  >
                    {reward.icon}
                  </Box>
                ))
            ) : (
              <Text alignSelf="center" color="#76532e">
                Unlock your first item to start your shelf.
              </Text>
            )}
          </Flex>
        </Box>

        <Heading as="h2" mb="14px" color="app.text.heading" fontSize="22px">
          Unlocks
        </Heading>
        <Box
          display="grid"
          gridTemplateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap="14px"
        >
          {dashboard?.rewards.map((reward) => (
            <Box
              key={reward.id}
              p="18px"
              border="1px solid"
              borderColor={
                reward.unlocked ? "app.border.accent" : "app.border.card"
              }
              borderRadius="16px"
              background="app.surface.card"
              opacity={reward.unlocked ? 1 : 0.88}
            >
              <Text fontSize="34px">{reward.icon}</Text>
              <Heading
                as="h3"
                mt="8px"
                fontSize="16px"
                color="app.text.heading"
              >
                {reward.name}
              </Heading>
              <Text mt="4px" minH="42px" color="app.text.body" fontSize="13px">
                {reward.description}
              </Text>
              {reward.unlocked ? (
                <Text
                  mt="14px"
                  color="app.accent.text"
                  fontSize="13px"
                  fontWeight="700"
                >
                  Unlocked
                </Text>
              ) : (
                <Button
                  mt="14px"
                  width="100%"
                  background="app.action.default"
                  color="white"
                  onClick={() => handleUnlock(reward.id)}
                  disabled={
                    Boolean(unlockingId) || dashboard.points < reward.cost
                  }
                >
                  {unlockingId === reward.id
                    ? "Unlocking…"
                    : `Unlock · ${reward.cost} points`}
                </Button>
              )}
            </Box>
          ))}
        </Box>

        <Heading
          as="h2"
          mt="34px"
          mb="4px"
          color="app.text.heading"
          fontSize="22px"
        >
          Medal Case
        </Heading>
        <Text mb="14px" color="app.text.body" fontSize="13px">
          Build a lasting medal collection through quiz mastery, correct
          answers, XP, and shelf progress.
        </Text>
        <Box
          display="grid"
          gridTemplateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap="12px"
        >
          {dashboard?.achievements.map((achievement) => {
            const medal = medalStyles[achievement.tier] || medalStyles.starter;
            return (
              <Flex
                key={achievement.id}
                p="14px"
                align="center"
                gap="14px"
                border="1px solid"
                borderColor={
                  achievement.unlocked ? medal.border : "app.border.card"
                }
                borderRadius="14px"
                background={
                  achievement.unlocked ? medal.background : "app.surface.card"
                }
                opacity={achievement.unlocked ? 1 : 0.65}
                boxShadow={
                  achievement.unlocked
                    ? "0 8px 18px rgba(65, 48, 22, 0.10)"
                    : "none"
                }
              >
                <Flex
                  flexShrink="0"
                  w="50px"
                  h="50px"
                  align="center"
                  justify="center"
                  borderRadius="full"
                  border="3px solid"
                  borderColor={
                    achievement.unlocked ? medal.border : "app.border.card"
                  }
                  background={
                    achievement.unlocked
                      ? "rgba(255,255,255,0.48)"
                      : "app.surface.page"
                  }
                  boxShadow={
                    achievement.unlocked
                      ? "inset 0 0 0 3px rgba(255,255,255,0.4)"
                      : "none"
                  }
                >
                  <Text fontSize="27px">{achievement.icon}</Text>
                </Flex>
                <Box>
                  <Text
                    fontWeight="800"
                    color={
                      achievement.unlocked ? medal.color : "app.text.heading"
                    }
                  >
                    {achievement.name}
                    {achievement.unlocked ? " · Earned" : ""}
                  </Text>
                  <Text
                    color={achievement.unlocked ? medal.color : "app.text.body"}
                    fontSize="13px"
                  >
                    {achievement.description}
                    {achievement.target
                      ? ` (${achievement.progress}/${achievement.target})`
                      : ""}
                  </Text>
                </Box>
              </Flex>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Rewards;
