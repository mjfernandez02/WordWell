import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { API_URL } from "../config/api";
import { CODE_MAP, codeMessage } from "../utils/apiClient";
import { generateCodeVerifier, generateCodeChallenge } from "../pkce";
import {
  LoginAlert,
  LoginBadge,
  LoginBadgeDot,
  LoginCard,
  LoginDivider,
  LoginField,
  LoginFieldError,
  LoginFooter,
  LoginFooterLink,
  LoginGrid,
  LoginInput,
  LoginLabel,
  LoginOrb,
  LoginPage,
  LoginPasswordField,
  LoginPasswordToggle,
  LoginSubmit,
  LoginSubtitle,
  LoginTitle,
} from "../styles/Login.styles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const clientId = searchParams.get("client_id");
  const redirectUri = searchParams.get("redirect_uri");
  const state = searchParams.get("state");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const loginPayload = { email, password };

    if (clientId && redirectUri) {
      try {
        loginPayload.client_id = clientId;
        loginPayload.redirect_uri = redirectUri;
        const incomingChallenge = searchParams.get("code_challenge");
        if (incomingChallenge) {
          // The initiating client owns the verifier; preserve its challenge and state.
          loginPayload.code_challenge = incomingChallenge;
          loginPayload.code_challenge_method =
            searchParams.get("code_challenge_method") || "S256";
          if (state) loginPayload.state = state;
        } else if (new URL(redirectUri).origin === window.location.origin) {
          const codeVerifier = generateCodeVerifier();
          loginPayload.code_challenge =
            await generateCodeChallenge(codeVerifier);
          loginPayload.code_challenge_method = "S256";
          loginPayload.state = state || crypto.randomUUID();
          sessionStorage.setItem("pkce_code_verifier", codeVerifier);
          sessionStorage.setItem("oauth_client_id", clientId);
          sessionStorage.setItem("oauth_redirect_uri", redirectUri);
          sessionStorage.setItem("oauth_state", loginPayload.state);
        } else if (state) loginPayload.state = state;

        const res = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(loginPayload),
          credentials: "include",
        });

        const data = await res.json().catch(() => ({}));
        if (res.ok && data.redirectUrl) {
          window.location.assign(data.redirectUrl);
        } else {
          const code =
            data.errorCode ||
            data.code ||
            (res.status === 429 ? "RATE_LIMITED" : null);
          if (code === "VALIDATION_ERROR") {
            setFieldErrors(CODE_MAP.VALIDATION_ERROR(data));
          }
          setError(
            code ? codeMessage(code, data) : data.error || "Login failed",
          );
        }
      } catch {
        setError("Unable to log in. Please try again.");
      }
    } else {
      setFieldErrors({});
      setError(null);
      const result = await login(email, password);
      if (result && result.success) {
        navigate("/practice");
      } else {
        if (result && result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
          setError(Object.values(result.fieldErrors)[0]);
        } else {
          setError(result?.error || CODE_MAP.INVALID_CREDENTIALS());
        }
      }
    }
  };

  return (
    <LoginPage>
      <LoginOrb opacity="0.2" />
      <LoginGrid />

      <LoginCard>
        <LoginBadge>
          <LoginBadgeDot />
          Welcome to WordWell
        </LoginBadge>

        <LoginTitle>Welcome back</LoginTitle>
        <LoginSubtitle>
          Pick up your words right where you left off.
        </LoginSubtitle>

        {error && (
          <LoginAlert>
            <span>⚠</span> {error}
          </LoginAlert>
        )}

        <form onSubmit={handleLogin}>
          <LoginField>
            <LoginLabel>Email address</LoginLabel>
            <LoginInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
            {fieldErrors.email && (
              <LoginFieldError>{fieldErrors.email}</LoginFieldError>
            )}
          </LoginField>

          <LoginField>
            <LoginLabel>Password</LoginLabel>
            <LoginPasswordField>
              <LoginInput
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                paddingRight="76px"
              />
              <LoginPasswordToggle
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? "Hide" : "Show"}
              </LoginPasswordToggle>
            </LoginPasswordField>
            {fieldErrors.password && (
              <LoginFieldError>{fieldErrors.password}</LoginFieldError>
            )}
          </LoginField>

          <LoginSubmit type="submit" disabled={loading}>
            {loading ? "Logging in…" : "Log in →"}
          </LoginSubmit>
        </form>

        <LoginDivider />

        <LoginFooter>
          No account?{" "}
          <LoginFooterLink to="/signup">Start learning free</LoginFooterLink>
        </LoginFooter>
      </LoginCard>
    </LoginPage>
  );
};

export default Login;
