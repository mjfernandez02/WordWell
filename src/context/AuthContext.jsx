import { createContext, useState, useCallback, useEffect } from "react";
import { apiPost, CODE_MAP, codeMessage } from "../utils/apiClient";
import { useToast } from "./ToastContext";
import {
  clearSession,
  completeSession,
  getAccessToken,
  initializeSession,
  logoutSession,
  refreshSession,
} from "../services/sessionService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    let active = true;
    const onSession = (event) => {
      if (active) setSession(event.detail);
    };
    window.addEventListener("auth-session-change", onSession);
    initializeSession()
      .catch((err) => {
        if (active) setError(err.message || "Unable to validate your session.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    const interval = window.setInterval(() => {
      if (localStorage.getItem("refreshToken"))
        getAccessToken().catch(() => {});
    }, 60_000);
    const onStorage = (event) => {
      if (event.key === "accessToken" && !event.newValue) clearSession();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      active = false;
      window.clearInterval(interval);
      window.removeEventListener("auth-session-change", onSession);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const completeAuthentication = useCallback(
    async (accessToken, refreshToken) => {
      await completeSession(accessToken, refreshToken);
    },
    [],
  );

  const login = useCallback(
    async (email, password) => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiPost(
          "/login",
          { email, password },
          { credentials: "include" },
        );
        await completeAuthentication(data.accessToken, data.refreshToken);
        return { success: true };
      } catch (err) {
        const code = err.errorCode || "SERVER_ERROR";
        if (code === "VALIDATION_ERROR") {
          const fieldErrors = CODE_MAP.VALIDATION_ERROR(err);
          setError(Object.values(fieldErrors)[0] || "Validation error");
          return { success: false, fieldErrors, errorCode: code };
        }
        const message = codeMessage(code, err);
        if (code === "RATE_LIMITED" || code === "SERVER_ERROR")
          showToast(message, "error");
        setError(message);
        return { success: false, error: message, errorCode: code };
      } finally {
        setLoading(false);
      }
    },
    [completeAuthentication, showToast],
  );

  const logout = useCallback(async () => {
    try {
      await logoutSession();
    } catch {
      showToast(
        "Signed out locally. The server could not confirm session revocation.",
        "error",
      );
    }
  }, [showToast]);

  const refreshAccessToken = useCallback(async () => {
    try {
      await refreshSession();
      return true;
    } catch {
      return false;
    }
  }, []);

  const updateProgress = useCallback(({ xp, points }) => {
    setSession((current) =>
      current ? { ...current, user: { ...current.user, xp, points } } : current,
    );
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        accessToken: session?.accessToken ?? null,
        refreshToken: session?.refreshToken ?? null,
        loading,
        error,
        login,
        logout,
        completeAuthentication,
        refreshAccessToken,
        updateProgress,
        isAuthenticated: Boolean(session?.user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
