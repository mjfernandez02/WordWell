import { apiGet, apiPost } from "../utils/apiClient.js";

let refreshPromise;
let initializationPromise;
let generation = 0;

const publish = (session) => {
  window.dispatchEvent(
    new CustomEvent("auth-session-change", { detail: session }),
  );
};

export const clearSession = () => {
  generation += 1;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  publish(null);
};

export const storeSession = (session) => {
  localStorage.setItem("accessToken", session.accessToken);
  if (session.refreshToken)
    localStorage.setItem("refreshToken", session.refreshToken);
  else localStorage.removeItem("refreshToken");
  publish(session);
  return session;
};

export const completeSession = async (accessToken, refreshToken) => {
  const started = ++generation;
  const { user } = await apiGet("/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (started !== generation) throw new Error("Sign-in was cancelled.");
  return storeSession({ accessToken, refreshToken, user });
};

export const refreshSession = () => {
  if (refreshPromise) return refreshPromise;
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    clearSession();
    return Promise.reject(new Error("Your sign-in session has expired."));
  }
  const started = generation;
  refreshPromise = (async () => {
    try {
      const tokens = await apiPost(
        "/refresh",
        { refreshToken },
        { credentials: "include" },
      );
      if (started !== generation) throw new Error("Sign-in was cancelled.");
      // Save rotation before /me so a network failure cannot lose the new token.
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      const { user } = await apiGet("/me", {
        headers: { Authorization: `Bearer ${tokens.accessToken}` },
      });
      if (started !== generation) throw new Error("Sign-in was cancelled.");
      return storeSession({ ...tokens, user });
    } catch (error) {
      if (error.status === 401 && started === generation) clearSession();
      throw error;
    }
  })().finally(() => {
    refreshPromise = null;
  });
  return refreshPromise;
};

export const getAccessToken = async () => {
  const token = localStorage.getItem("accessToken");
  try {
    const payload = token?.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const { exp } = JSON.parse(atob(payload));
    if (exp * 1000 > Date.now() + 60_000) return token;
  } catch {
    /* Missing or malformed tokens require session refresh. */
  }
  return (await refreshSession()).accessToken;
};

export const initializeSession = () => {
  if (initializationPromise) return initializationPromise;
  if (
    !localStorage.getItem("accessToken") &&
    !localStorage.getItem("refreshToken")
  ) {
    return Promise.resolve(null);
  }
  const started = generation;
  initializationPromise = (async () => {
    const accessToken = await getAccessToken();
    try {
      const { user } = await apiGet("/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (started !== generation) return null;
      return storeSession({
        accessToken,
        refreshToken: localStorage.getItem("refreshToken"),
        user,
      });
    } catch (error) {
      if (error.status === 401) return refreshSession();
      throw error;
    }
  })().finally(() => {
    initializationPromise = null;
  });
  return initializationPromise;
};

export const logoutSession = async () => {
  // Revoke the rotated token when sign-out races an in-flight refresh.
  if (refreshPromise) await refreshPromise.catch(() => {});
  const refreshToken = localStorage.getItem("refreshToken");
  const accessToken = localStorage.getItem("accessToken");
  clearSession();
  await apiPost(
    "/logout",
    { ...(refreshToken ? { refreshToken } : {}) },
    {
      credentials: "include",
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    },
  );
};
