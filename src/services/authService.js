import { apiPost } from "../utils/apiClient.js";
import { refreshSession } from "./sessionService.js";

export const authService = {
  login: (payload) => apiPost("/login", payload, { credentials: "include" }),
  register: (payload) => apiPost("/register", payload),
  refresh: refreshSession,
};
