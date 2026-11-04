import { apiPost } from "../utils/apiClient.js";
import { refreshSession } from "./sessionService.js";

export const authService = {
  login: (payload) => apiPost("/login", payload, { credentials: "include" }),
  register: (payload) => apiPost("/register", payload),
  forgotPassword: (payload) => apiPost("/forgot-password", payload),
  resetPassword: (payload) => apiPost("/reset-password", payload),
  refresh: refreshSession,
};
