import { apiPost } from "../utils/apiClient.js";

const exchanges = new Map();

export const exchangeAuthorizationCode = (code, state) => {
  if (!code) return Promise.reject(new Error("Missing authorization code"));
  const expectedState = sessionStorage.getItem("oauth_state");
  if (!state || !expectedState || state !== expectedState) {
    return Promise.reject(
      new Error("Invalid OAuth state. Please start sign-in again."),
    );
  }
  if (exchanges.has(code)) return exchanges.get(code);
  const clientId = sessionStorage.getItem("oauth_client_id");
  const redirectUri = sessionStorage.getItem("oauth_redirect_uri");
  const codeVerifier = sessionStorage.getItem("pkce_code_verifier");
  if (!clientId || !redirectUri || !codeVerifier) {
    return Promise.reject(
      new Error("Missing OAuth configuration. Please start sign-in again."),
    );
  }
  // Share the exchange across StrictMode effect executions. Browser clients use PKCE.
  const exchange = apiPost(
    "/token",
    {
      grant_type: "authorization_code",
      code,
      client_id: clientId,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    },
    { credentials: "include" },
  );
  exchanges.set(code, exchange);
  return exchange;
};

export const clearOAuthConfiguration = () => {
  for (const key of [
    "oauth_client_id",
    "oauth_redirect_uri",
    "pkce_code_verifier",
    "oauth_client_secret",
    "oauth_state",
  ]) {
    sessionStorage.removeItem(key);
  }
  exchanges.clear();
};
