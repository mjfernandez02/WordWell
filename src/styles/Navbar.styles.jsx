import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const actionStyles = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  minH: "40px",
  padding: "0 15px",
  border: "1px solid transparent",
  borderRadius: "9px",
  color: "inherit",
  background: "transparent",
  fontSize: "13px",
  fontWeight: "700",
  lineHeight: "normal",
  textDecoration: "none",
  cursor: "pointer",
};

export const NavbarRoot = (props) => (
  <Flex
    as="nav"
    position="sticky"
    top="0"
    zIndex="10"
    minH="68px"
    px={{ base: "18px", md: "5vw", lg: "72px" }}
    py="12px"
    align="center"
    justify="space-between"
    gap={{ base: "12px", xl: "24px" }}
    flexWrap="wrap"
    borderBottom="1px solid #e3e7df"
    background="rgba(247, 247, 242, 0.94)"
    {...props}
  />
);

export const NavbarBrand = (props) => (
  <Link
    asChild
    display="flex"
    alignItems="center"
    gap="10px"
    color="inherit"
    textDecoration="none"
    _hover={{ textDecoration: "none" }}
  >
    <RouterLink {...props} />
  </Link>
);

export const NavbarLogo = (props) => (
  <Box
    width="34px"
    height="34px"
    display="grid"
    placeItems="center"
    borderRadius="10px"
    color="white"
    background="app.action.default"
    fontFamily="Georgia, serif"
    fontWeight="700"
    {...props}
  />
);

export const NavbarName = (props) => (
  <Text
    as="span"
    fontFamily="Georgia, serif"
    fontSize="20px"
    fontWeight="700"
    display={{ base: "none", sm: "inline" }}
    {...props}
  />
);

export const NavbarLinks = (props) => (
  <Flex
    align="center"
    justify="flex-end"
    flexWrap="wrap"
    marginLeft="auto"
    gap="10px"
    {...props}
  />
);

export const NavbarStats = (props) => (
  <Flex display="flex" align="center" gap="8px" {...props} />
);

export const NavbarStatPill = ({ tone = "brand", ...props }) => (
  <Flex
    minH="36px"
    padding="0 12px"
    align="center"
    justify="center"
    gap="6px"
    border="1px solid"
    borderColor={tone === "reward" ? "app.reward.default" : "app.border.accent"}
    borderRadius="999px"
    color={tone === "reward" ? "app.reward.default" : "app.accent.text"}
    background="app.surface.card"
    fontSize="12px"
    fontWeight="700"
    whiteSpace="nowrap"
    {...props}
  />
);

export const NavbarAppLinks = (props) => (
  <Flex
    order={{ base: "3", xl: "0" }}
    width={{ base: "100%", xl: "auto" }}
    justify="center"
    align="center"
    gap={{ base: "2px", sm: "6px" }}
    {...props}
  />
);

export const NavbarGhostLink = ({ active = false, ...props }) => (
  <Link
    asChild
    {...actionStyles}
    minH={{ base: "34px", sm: "40px" }}
    padding={{ base: "0 8px", sm: "0 15px" }}
    color={active ? "app.accent.text" : "inherit"}
    background={active ? "app.surface.hover" : "transparent"}
    fontSize={{ base: "12px", sm: "13px" }}
    _hover={{
      color: "app.accent.text",
      background: "app.surface.hover",
      textDecoration: "none",
    }}
  >
    <RouterLink {...props} />
  </Link>
);

export const NavbarPrimaryLink = (props) => (
  <Link
    asChild
    {...actionStyles}
    color="white"
    background="app.action.default"
    _hover={{ background: "app.action.hover", textDecoration: "none" }}
  >
    <RouterLink {...props} />
  </Link>
);

export const NavbarOutlineButton = (props) => (
  <Button
    {...actionStyles}
    borderColor="#cad3cc"
    _hover={{ background: "app.surface.hover" }}
    {...props}
  />
);

export const NavbarUser = (props) => (
  <Flex
    align="center"
    gap="8px"
    padding="6px 12px"
    background="app.surface.hover"
    border="1px solid"
    borderColor="app.border.card"
    borderRadius="8px"
    display={{ base: "none", xl: "flex" }}
    {...props}
  />
);

export const NavbarAvatar = (props) => (
  <Flex
    width="22px"
    height="22px"
    align="center"
    justify="center"
    flexShrink="0"
    borderRadius="6px"
    color="white"
    background="app.action.default"
    fontSize="10px"
    fontWeight="700"
    {...props}
  />
);

export const NavbarUserName = (props) => (
  <Text
    as="span"
    color="app.text.default"
    fontSize="13px"
    maxW="160px"
    truncate
    {...props}
  />
);
