import { useState } from "react";
import { Box, Button, Heading, Input, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const UsernameSetup = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const { updateUsername } = useAuth();
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await updateUsername(username);
      navigate("/onboarding", { replace: true });
    } catch (requestError) {
      setError(
        requestError.details?.[0]?.message ||
          requestError.message ||
          "That username is unavailable.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box
      as="main"
      minH="calc(100vh - 68px)"
      display="grid"
      placeItems="center"
      px="16px"
      background="app.surface.page"
    >
      <Box
        as="form"
        onSubmit={submit}
        width="100%"
        maxW="440px"
        p={{ base: "28px", md: "40px" }}
        border="1px solid"
        borderColor="app.border.card"
        borderRadius="20px"
        background="app.surface.card"
        boxShadow="0 12px 35px rgba(35, 55, 45, 0.08)"
      >
        <Text
          color="app.accent.text"
          fontSize="11px"
          fontWeight="800"
          letterSpacing="0.12em"
          textTransform="uppercase"
        >
          One last step
        </Text>
        <Heading mt="10px" color="app.text.heading" fontFamily="Georgia, serif">
          Choose your username
        </Heading>
        <Text mt="10px" color="app.text.body">
          This is how WordWell will show you across the app and leaderboard.
        </Text>
        <Input
          mt="24px"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="word_learner"
          required
          minLength="3"
          maxLength="24"
          pattern="[A-Za-z0-9_]+"
          autoComplete="username"
        />
        <Text mt="8px" color="app.text.muted" fontSize="12px">
          3–24 characters: letters, numbers, and underscores only.
        </Text>
        {error && (
          <Text mt="14px" color="red.600" role="alert">
            {error}
          </Text>
        )}
        <Button
          mt="22px"
          width="100%"
          type="submit"
          background="app.action.default"
          color="white"
          disabled={saving}
        >
          {saving ? "Saving…" : "Continue"}
        </Button>
      </Box>
    </Box>
  );
};

export default UsernameSetup;
