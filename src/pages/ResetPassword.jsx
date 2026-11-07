import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import {
  ResetPasswordContainer,
  ResetPasswordCard,
  ResetPasswordTitle,
  ResetPasswordText
} from '../styles/ResetPassword.styles';
import { LoginField, LoginInput, LoginSubmit } from '../styles/Login.styles';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('This password-reset link is invalid. Please request a new one.');
      return;
    }
    if (!password) {
      setError('Enter a new password.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      await authService.resetPassword({ token, newPassword: password });
      setMessage('Password has been successfully reset!');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ResetPasswordContainer>
      <ResetPasswordCard>
        <ResetPasswordTitle>Reset Password</ResetPasswordTitle>
        <ResetPasswordText>
          Please enter your new password below.
        </ResetPasswordText>
        <form onSubmit={handleSubmit}>
          <LoginField>
            <LoginInput
              type="password"
              placeholder="New Password"
              aria-label="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </LoginField>
          <LoginField>
            <LoginInput
              type="password"
              placeholder="Confirm New Password"
              aria-label="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </LoginField>
          <LoginSubmit type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Reset Password'}
          </LoginSubmit>
        </form>
        {message && <p style={{ textAlign: 'center', color: 'green', marginTop: '16px' }}>{message}</p>}
        {error && <p style={{ textAlign: 'center', color: 'red', marginTop: '16px' }}>{error}</p>}
      </ResetPasswordCard>
    </ResetPasswordContainer>
  );
};

export default ResetPassword;
