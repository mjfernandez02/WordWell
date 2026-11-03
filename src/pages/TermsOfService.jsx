import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { AlertTriangle } from "lucide-react";

export default function TermsOfService() {
  return (
    <Container maxW="container.md" py={10}>
      <VStack align="start" gap={6}>
        <Heading size="xl">Terms of Service</Heading>
        <Text fontWeight="bold" color="fg.muted">
          Last Updated: November 3, 2026
        </Text>

        <Box
          width="100%"
          borderBottom="1px solid"
          borderColor="border"
          mb={2}
        />

        <Box>
          <Heading size="md" mb={2}>
            1. Acceptance of Terms
          </Heading>
          <Text>
            By using WordWell, you agree to these terms. If you do not agree,
            please stop using the application immediately.
          </Text>
        </Box>

        <Box>
          <Heading size="md" mb={2}>
            2. Use of the Service
          </Heading>
          <Text>
            You agree to use WordWell for lawful purposes only. You are
            responsible for maintaining the confidentiality of your account
            password.
          </Text>
        </Box>

        <Box>
          <Heading size="md" mb={2}>
            3. Disclaimer of Warranty
          </Heading>
          {/* Custom Alert Box for Chakra v3 without snippets */}
          <Box
            p={4}
            borderRadius="md"
            bg="orange.50"
            border="1px solid"
            borderColor="orange.200"
            display="flex"
            gap={3}
          >
            <AlertTriangle size={20} color="#d97706" flexShrink={0} />
            <Box>
              <Text fontWeight="bold" color="orange.800" mb={1}>
                WordWell is provided "AS IS" and "AS AVAILABLE."
              </Text>
              <Text fontSize="sm" color="orange.700">
                This is a development project. I make no guarantees that the
                service will be uninterrupted, error-free, or that your data
                will never be lost. You use this service at your own risk.
              </Text>
            </Box>
          </Box>
        </Box>

        <Box>
          <Heading size="md" mb={2}>
            4. Limitation of Liability
          </Heading>
          <Text>
            To the maximum extent permitted by law, the developer of WordWell
            shall not be liable for any damages (including loss of data or
            profit) arising out of the use or inability to use the application.
          </Text>
        </Box>

        <Box>
          <Heading size="md" mb={2}>
            5. Ownership
          </Heading>
          <Text>
            The code, design, and branding of WordWell are the intellectual
            property of the developer. Users retain ownership of the specific
            content/words they input into the system.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
}
