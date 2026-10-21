import { beforeEach, afterEach, test } from "node:test";
import assert from "node:assert/strict";
import {
  clearSession,
  completeSession,
  getAccessToken,
  initializeSession,
  logoutSession,
  refreshSession,
} from "../src/services/sessionService.js";
import {
  getPracticeQuiz,
  submitPracticeAnswers,
} from "../src/services/practiceService.js";
import {
  clearOAuthConfiguration,
  exchangeAuthorizationCode,
} from "../src/services/oauthService.js";

const storage = () => {
  const values = new Map();
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: (key) => values.delete(key),
  };
};
const token = (seconds = 900) =>
  `header.${btoa(JSON.stringify({ exp: Math.floor(Date.now() / 1000) + seconds }))}.signature`;
const response = (status, body) => ({
  status,
  ok: status < 400,
  json: async () => body,
});
const user = { userId: 42, xp: 100, points: 25 };
let originalFetch;

beforeEach(() => {
  originalFetch = globalThis.fetch;
  globalThis.window = new EventTarget();
  globalThis.localStorage = storage();
  globalThis.sessionStorage = storage();
  clearSession();
});
afterEach(() => {
  globalThis.fetch = originalFetch;
  clearOAuthConfiguration();
});

test("concurrent expired-token requests share a refresh and persist rotation", async () => {
  localStorage.setItem("accessToken", token(-1));
  localStorage.setItem("refreshToken", "old-refresh");
  const fresh = token();
  let refreshes = 0;
  globalThis.fetch = async (url) => {
    if (url.endsWith("/refresh")) {
      refreshes += 1;
      return response(200, { accessToken: fresh, refreshToken: "rotated" });
    }
    return response(200, { user });
  };
  const tokens = await Promise.all([
    getAccessToken(),
    getAccessToken(),
    getAccessToken(),
  ]);
  assert.deepEqual(tokens, [fresh, fresh, fresh]);
  assert.equal(refreshes, 1);
  assert.equal(localStorage.getItem("refreshToken"), "rotated");
});

test("StrictMode initialization shares validation and publishes the server user", async () => {
  localStorage.setItem("accessToken", token());
  let validations = 0;
  let published;
  window.addEventListener("auth-session-change", (event) => {
    published = event.detail;
  });
  globalThis.fetch = async () => {
    validations += 1;
    return response(200, { user });
  };
  await Promise.all([initializeSession(), initializeSession()]);
  assert.equal(validations, 1);
  assert.deepEqual(published.user, user);
});

test("an invalid refresh clears authentication", async () => {
  localStorage.setItem("accessToken", token(-1));
  localStorage.setItem("refreshToken", "revoked");
  globalThis.fetch = async () =>
    response(401, { error: "Invalid refresh token" });
  await assert.rejects(refreshSession());
  assert.equal(localStorage.getItem("accessToken"), null);
  assert.equal(localStorage.getItem("refreshToken"), null);
});

test("network errors preserve the session for a later retry", async () => {
  localStorage.setItem("refreshToken", "valid-refresh");
  globalThis.fetch = async () => {
    throw new Error("Offline");
  };
  await assert.rejects(refreshSession(), /Offline/);
  assert.equal(localStorage.getItem("refreshToken"), "valid-refresh");
});

test("a failed /me request cannot lose a rotated refresh token", async () => {
  localStorage.setItem("refreshToken", "old");
  globalThis.fetch = async (url) => {
    if (url.endsWith("/refresh"))
      return response(200, { accessToken: token(), refreshToken: "rotated" });
    throw new Error("Offline");
  };
  await assert.rejects(refreshSession(), /Offline/);
  assert.equal(localStorage.getItem("refreshToken"), "rotated");
});

test("sign-out waits for rotation and revokes the new refresh token", async () => {
  localStorage.setItem("refreshToken", "old");
  let finishRefresh;
  let revoked;
  globalThis.fetch = async (url, options) => {
    if (url.endsWith("/refresh"))
      return new Promise((resolve) => {
        finishRefresh = resolve;
      });
    if (url.endsWith("/me")) return response(200, { user });
    revoked = JSON.parse(options.body).refreshToken;
    return response(200, {});
  };
  const refresh = refreshSession();
  const logout = logoutSession();
  finishRefresh(
    response(200, { accessToken: token(), refreshToken: "rotated" }),
  );
  await Promise.all([refresh, logout]);
  assert.equal(revoked, "rotated");
  assert.equal(localStorage.getItem("accessToken"), null);
});

test("logout during session validation cannot restore authentication", async () => {
  let resolve;
  globalThis.fetch = () =>
    new Promise((done) => {
      resolve = done;
    });
  const signIn = completeSession(token(), "refresh");
  clearSession();
  resolve(response(200, { user }));
  await assert.rejects(signIn, /cancelled/);
  assert.equal(localStorage.getItem("accessToken"), null);
});

test("practice retries a 401 with the rotated token and identical answers", async () => {
  const old = token();
  const fresh = token(1800);
  localStorage.setItem("accessToken", old);
  localStorage.setItem("refreshToken", "old-refresh");
  const attempts = [];
  globalThis.fetch = async (url, options) => {
    if (url.endsWith("/refresh"))
      return response(200, { accessToken: fresh, refreshToken: "rotated" });
    if (url.endsWith("/me")) return response(200, { user });
    attempts.push(options);
    return attempts.length === 1
      ? response(401, {})
      : response(201, { xp: 100, points: 25 });
  };
  const answers = {
    quizId: "quiz",
    answers: [{ questionId: "question", optionId: "answer" }],
  };
  assert.deepEqual(await submitPracticeAnswers(answers), {
    xp: 100,
    points: 25,
  });
  assert.equal(attempts.length, 2);
  assert.equal(attempts[0].body, attempts[1].body);
  assert.equal(attempts[1].headers.Authorization, `Bearer ${fresh}`);
});

test("duplicate quiz requests share one issued quiz", async () => {
  localStorage.setItem("accessToken", token());
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return response(201, { quizId: "quiz" });
  };
  const results = await Promise.all([getPracticeQuiz(), getPracticeQuiz()]);
  assert.equal(calls, 1);
  assert.deepEqual(results[0], results[1]);
});

const configureOAuth = () => {
  sessionStorage.setItem("oauth_state", "expected-state");
  sessionStorage.setItem("oauth_client_id", "public-client");
  sessionStorage.setItem(
    "oauth_redirect_uri",
    "https://example.com/#/callback",
  );
  sessionStorage.setItem("pkce_code_verifier", "verifier");
};

test("OAuth rejects mismatched state before exchanging a code", async () => {
  configureOAuth();
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return response(200, {});
  };
  await assert.rejects(
    exchangeAuthorizationCode("code", "wrong-state"),
    /Invalid OAuth state/,
  );
  assert.equal(calls, 0);
});

test("StrictMode callbacks exchange a code once using PKCE without a client secret", async () => {
  configureOAuth();
  let calls = 0;
  globalThis.fetch = async (_url, options) => {
    calls += 1;
    const body = JSON.parse(options.body);
    assert.equal(body.code_verifier, "verifier");
    assert.equal(body.client_secret, undefined);
    return response(200, { access_token: "access", refresh_token: "refresh" });
  };
  await Promise.all([
    exchangeAuthorizationCode("code", "expected-state"),
    exchangeAuthorizationCode("code", "expected-state"),
  ]);
  assert.equal(calls, 1);
});
