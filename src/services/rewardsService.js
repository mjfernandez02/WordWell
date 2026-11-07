import { API_BASE } from "../config/api.js";
import { clearSession, getAccessToken, refreshSession } from "./sessionService.js";

const request = async (path, body) => {
  const send = (token) =>
    fetch(`${API_BASE}/api/rewards${path}`, {
      method: body ? "POST" : "GET",
      headers: { Authorization: `Bearer ${token}`, ...(body ? { "Content-Type": "application/json" } : {}) },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  let response = await send(await getAccessToken());
  if (response.status === 401) {
    response = await send((await refreshSession()).accessToken);
    if (response.status === 401) clearSession();
  }
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.error || "Unable to load rewards.");
  return data;
};

export const getRewards = () => request("/");
export const unlockReward = (rewardId) => request("/unlock", { rewardId });
