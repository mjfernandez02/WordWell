import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Container,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  exchangeAuthorizationCode,
  clearOAuthConfiguration,
} from "../services/oauthService";

const Callback = () => {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("processing");
  const navigate = useNavigate();
  const { completeAuthentication } = useAuth();

  useEffect(() => {
    let active = true;
    let redirectTimer;
    const handleCallback = async () => {
      const code = searchParams.get("code");
      try {
        const data = await exchangeAuthorizationCode(
          code,
          searchParams.get("state"),
        );
        if (!active) return;
        await completeAuthentication(data.access_token, data.refresh_token);
        if (!active) return;
        clearOAuthConfiguration();
        setStatus("success");
        redirectTimer = window.setTimeout(
          () => navigate("/practice", { replace: true }),
          1500,
        );
      } catch (caughtError) {
        if (!active) return;
        setError(caughtError?.message || "Token exchange failed");
        setStatus("error");
      }
    };

    handleCallback();
    return () => {
      active = false;
      window.clearTimeout(redirectTimer);
    };
  }, [searchParams, navigate, completeAuthentication]);

  return (
    <Container maxWidth="md" py="24">
      <Box borderWidth="1px" borderRadius="lg" p="8" textAlign="center">
        {status === "processing" && (
          <VStack gap="4">
            <Spinner size="xl" />
            <Heading size="lg">Processing login…</Heading>
            <Text color="fg.muted">
              Please wait while we complete your authentication.
            </Text>
          </VStack>
        )}

        {status === "success" && (
          <VStack gap="4">
            <Text fontSize="5xl" color="green.600" aria-hidden="true">
              ✓
            </Text>
            <Heading size="lg">Login successful</Heading>
            <Text color="fg.muted">Redirecting you to practice…</Text>
          </VStack>
        )}

        {status === "error" && (
          <VStack gap="4">
            <Heading size="lg">Authentication failed</Heading>
            {error && (
              <Alert.Root status="error" textAlign="left">
                <Alert.Indicator />
                <Alert.Description>{error}</Alert.Description>
              </Alert.Root>
            )}
            <Text color="fg.muted">Please try logging in again.</Text>
          </VStack>
        )}
      </Box>
    </Container>
  );
};

export default Callback;
