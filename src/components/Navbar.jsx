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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiDelete } from "../utils/apiClient";
import { getAccessToken, clearSession } from "../services/sessionService";
import { useToast } from "../context/ToastContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { pathname, hash } = useLocation();
  const showAppNavigation = Boolean(user);
  const experience = user?.xp ?? 0;
  const coins = user?.points ?? 0;

  const deleteAccount = async () => {
    if (!window.confirm("Permanently delete your account and its data? This cannot be undone.")) return;
    setDeleting(true);
    try {
      const token = await getAccessToken();
      await apiDelete("/me", { headers: { Authorization: `Bearer ${token}` } });
      await clearSession();
      navigate("/", { replace: true });
      showToast("Your account has been permanently deleted.", "success");
    } catch {
      showToast("Unable to delete your account. Please try again.", "error");
    } finally {
      setDeleting(false);
    }
  };

  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
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
          <NavbarGhostLink to="/quiz" active={pathname === "/quiz"}>
            Quiz
          </NavbarGhostLink>
          <NavbarGhostLink to="/rewards" active={pathname === "/rewards"}>
            Rewards
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
              {user?.username || user?.name || "User"}
            </NavbarUserName>
          </NavbarUser>
          <NavbarOutlineButton onClick={logout}>Sign out</NavbarOutlineButton>
          <NavbarOutlineButton onClick={deleteAccount} disabled={deleting}>
            {deleting ? "Deleting…" : "Delete account"}
          </NavbarOutlineButton>
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
