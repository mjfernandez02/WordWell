import { API_URL } from "../config/api.js";

export const CODE_MAP = {
  VALIDATION_ERROR: (data) =>
    data?.details?.reduce((acc, d) => ({ ...acc, [d.field]: d.message }), {}) ||
    {},
  INVALID_CREDENTIALS: () => "Invalid email or password.",
  ACCOUNT_LOCKED: () =>
    "Account locked. Reset your password or try again later.",
  EMAIL_TAKEN: () =>
    "Email already registered. Try signing in or reset password.",
  RATE_LIMITED: () => "Too many attempts. Try again later.",
  SERVER_ERROR: () => "Server error. Please try again later.",
};

function buildUrl(path) {
  if (!path) return API_URL;
  if (path.startsWith("http")) return path;
  return `${API_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

async function parseJsonSafe(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

export async function apiPost(path, body, options = {}) {
  const url = buildUrl(path);
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...options.headers },
    body: JSON.stringify(body),
    credentials: options.credentials || "same-origin",
  });

  const data = await parseJsonSafe(res);

  if (!res.ok) {
    const err = {
      status: res.status,
      errorCode:
        data?.errorCode ||
        data?.code ||
        (res.status === 429 ? "RATE_LIMITED" : "SERVER_ERROR"),
      message: data?.message || data?.error || data?.error_description || null,
      details: data?.details || null,
    };
    throw err;
  }

  return data;
}

export async function apiGet(path, options = {}) {
  const url = buildUrl(path);
  const res = await fetch(url, {
    method: "GET",
    headers: options.headers || {},
    credentials: options.credentials || "same-origin",
  });

  const data = await parseJsonSafe(res);
  if (!res.ok) {
    const err = {
      status: res.status,
      errorCode:
        data?.errorCode ||
        data?.code ||
        (res.status === 429 ? "RATE_LIMITED" : "SERVER_ERROR"),
      message: data?.message || data?.error || null,
      details: data?.details || null,
    };
    throw err;
  }

  return data;
}

export default apiPost;

export function codeMessage(code, data) {
  if (!code || typeof code !== "string") return CODE_MAP.SERVER_ERROR();
  const fn = CODE_MAP[code];
  if (typeof fn === "function") return fn(data);
  return CODE_MAP.SERVER_ERROR();
}
