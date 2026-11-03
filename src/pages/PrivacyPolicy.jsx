import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";

export default function PrivacyPolicy() {
  return (
    <Container maxW="container.md" py={10}>
      <VStack align="start" spacing={6}>
        <Heading size="lg">Privacy Policy</Heading>
        <Text fontWeight="bold" color="gray.500">
          Last Updated: November 3, 2026
        </Text>

        <Box width="100%" borderBottom="1px solid #e1e6df" mb={2} />

        <Box>
          <Heading size="md" mb={2}>
            1. Information We Collect
          </Heading>
          <Text>
            To provide the services of WordWell, we collect the following
            information:
            <VStack align="start" pl={4} mt={2} spacing={2}>
              <Text>
                • <strong>Account Information:</strong> Email address and
                encrypted passwords.
              </Text>
              <Text>
                • <strong>User Content:</strong> Words, lists, and data you
                input into the application.
              </Text>
              <Text>
                • <strong>Technical Data:</strong> Basic logs via our server and
                Supabase to ensure security.
              </Text>
            </VStack>
          </Text>
        </Box>

        <Box>
          <Heading size="md" mb={2}>
            2. How We Use Your Information
          </Heading>
          <Text>
            We use your data solely to manage your account, save and retrieve
            your personal word lists, and improve the app's performance and
            security.
          </Text>
        </Box>

        <Box>
          <Heading size="md" mb={2}>
            3. Data Sharing & Third Parties
          </Heading>
          <Text>
            We do not sell your data. We use third-party services to power the
            app, specifically
            <strong> Supabase</strong> for database storage and authentication.
          </Text>
        </Box>

        <Box>
          <Heading size="md" mb={2}>
            4. Your Rights
          </Heading>
          <Text>
            You can request to see the data we have stored about you or request
            that your account and all associated data be deleted at any time.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
}
