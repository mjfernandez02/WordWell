import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost, CODE_MAP, codeMessage } from "../utils/apiClient";
import { useToast } from "../context/ToastContext";
import {
  RegisterAlert,
  RegisterBadge,
  RegisterBadgeDot,
  RegisterCard,
  RegisterDivider,
  RegisterField,
  RegisterFooter,
  RegisterFooterLink,
  RegisterGrid,
  RegisterInput,
  RegisterLabel,
  RegisterOrb,
  RegisterPage,
  RegisterSubmit,
  RegisterSubtitle,
  RegisterTitle,
} from "../styles/Register.styles";

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await apiPost("/register", form);
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      const errObj = /** @type {any} */ (err);
      const code = errObj?.errorCode || "SERVER_ERROR";
      if (code === "VALIDATION_ERROR") {
        const fieldMap = CODE_MAP.VALIDATION_ERROR(errObj);
        // show first field error as global as well
        setError(Object.values(fieldMap)[0] || "Validation error");
      } else if (code === "EMAIL_TAKEN") {
        setError(CODE_MAP.EMAIL_TAKEN());
      } else if (code === "ACCOUNT_LOCKED") {
        setError(CODE_MAP.ACCOUNT_LOCKED());
      } else if (code === "RATE_LIMITED" || code === "SERVER_ERROR") {
        showToast(codeMessage(code), "error");
        setError(codeMessage(code));
      } else {
        setError(errObj?.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterPage>
      <RegisterOrb opacity="0.2" />
      <RegisterGrid />

      <RegisterCard>
        <RegisterBadge>
          <RegisterBadgeDot />
          Your word journey starts here
        </RegisterBadge>

        <RegisterTitle>Create your account</RegisterTitle>
        <RegisterSubtitle>
          A few minutes a day can change how you express yourself.
        </RegisterSubtitle>

        {error && (
          <RegisterAlert>
            <span>⚠</span> {error}
          </RegisterAlert>
        )}

        {success && (
          <RegisterAlert success>
            <span>✓</span> Account created — redirecting…
          </RegisterAlert>
        )}

        <form onSubmit={handleSubmit}>
          <RegisterField>
            <RegisterLabel>Email address</RegisterLabel>
            <RegisterInput
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </RegisterField>

          <RegisterField>
            <RegisterLabel>Password</RegisterLabel>
            <RegisterInput
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Choose a strong password"
              required
              autoComplete="new-password"
            />
          </RegisterField>

          <RegisterSubmit type="submit" disabled={loading || success}>
            {loading ? "Creating account…" : "Create account →"}
          </RegisterSubmit>
        </form>

        <RegisterDivider />

        <RegisterFooter>
          Already have an account?{" "}
          <RegisterFooterLink to="/login">Log in</RegisterFooterLink>
        </RegisterFooter>
      </RegisterCard>
    </RegisterPage>
  );
};

export default Register;
