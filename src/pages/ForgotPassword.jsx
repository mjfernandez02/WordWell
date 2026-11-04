import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import {
  ForgotPasswordContainer,
  ForgotPasswordCard,
  ForgotPasswordTitle,
  ForgotPasswordText,
} from "../styles/ForgotPassword.styles";
import { LoginField, LoginInput, LoginSubmit } from "../styles/Login.styles";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      await authService.forgotPassword({ email });
      setMessage(
        "If an account exists, a reset link has been sent to your email.",
      );
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ForgotPasswordContainer>
      <ForgotPasswordCard>
        <ForgotPasswordTitle>Forgot Password?</ForgotPasswordTitle>
        <ForgotPasswordText>
          Enter your email address and we'll send you a link to reset your
          password.
        </ForgotPasswordText>
        <form onSubmit={handleSubmit}>
          <LoginField>
            <LoginInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </LoginField>
          <LoginSubmit type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </LoginSubmit>
        </form>
        {message && (
          <p style={{ textAlign: "center", color: "green", marginTop: "16px" }}>
            {message}
          </p>
        )}
        {error && (
          <p style={{ textAlign: "center", color: "red", marginTop: "16px" }}>
            {error}
          </p>
        )}
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Back to Login
          </button>
        </div>
      </ForgotPasswordCard>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
