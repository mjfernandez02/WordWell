import { useAuth } from "../hooks/useAuth";
import { useLocation } from "react-router-dom";
import {
  NavbarAvatar,
  NavbarAppLinks,
  NavbarBrand,
  NavbarGhostLink,
  NavbarLinks,
  NavbarLogo,
  NavbarName,
  NavbarOutlineButton,
  NavbarPrimaryLink,
  NavbarRoot,
  NavbarStatPill,
  NavbarStats,
  NavbarUser,
  NavbarUserName,
} from "../styles/Navbar.styles";
import { Coin, Zap } from "./Logos";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { pathname, hash } = useLocation();
  const showAppNavigation = Boolean(user);
  const experience = user?.xp ?? 0;
  const coins = user?.points ?? 0;

  const initials = user?.email
    ? user.email.split("@")[0].slice(0, 2).toUpperCase()
    : user?.name
      ? user.name.slice(0, 2).toUpperCase()
      : "??";

  return (
    <NavbarRoot>
      <NavbarBrand to={showAppNavigation ? "/onboarding" : "/"}>
        <NavbarLogo>W</NavbarLogo>
        <NavbarName>WordWell</NavbarName>
      </NavbarBrand>

      {showAppNavigation && (
        <NavbarAppLinks aria-label="Main navigation">
          <NavbarGhostLink
            to="/onboarding"
            active={pathname === "/onboarding" && hash !== "#pet"}
          >
            Home
          </NavbarGhostLink>
          <NavbarGhostLink to="/practice" active={pathname === "/practice"}>
            Practice
          </NavbarGhostLink>
          <NavbarGhostLink to="/pet" active={pathname === "/pet"}>
            My Pet
          </NavbarGhostLink>
          <NavbarGhostLink
            to="/leaderboard"
            active={pathname === "/leaderboard"}
          >
            Leaderboard
          </NavbarGhostLink>
        </NavbarAppLinks>
      )}

      {user ? (
        <NavbarLinks>
          <NavbarStats aria-label="Your rewards">
            <NavbarStatPill aria-label={`${experience} experience points`}>
              <Zap /> {experience} XP
            </NavbarStatPill>
            <NavbarStatPill tone="reward" aria-label={`${coins} coins`}>
              <Coin /> {coins} Coins
            </NavbarStatPill>
          </NavbarStats>
          <NavbarUser>
            <NavbarAvatar>{initials}</NavbarAvatar>
            <NavbarUserName>
              {user?.email || user?.name || "User"}
            </NavbarUserName>
          </NavbarUser>
          <NavbarOutlineButton onClick={logout}>Sign out</NavbarOutlineButton>
        </NavbarLinks>
      ) : (
        <NavbarLinks>
          <NavbarGhostLink to="/login">Log in</NavbarGhostLink>
          <NavbarPrimaryLink to="/signup">Sign up</NavbarPrimaryLink>
        </NavbarLinks>
      )}
    </NavbarRoot>
  );
};

export default Navbar;
