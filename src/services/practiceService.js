import { API_BASE } from "../config/api.js";
import {
  clearSession,
  getAccessToken,
  refreshSession,
} from "./sessionService.js";

const pendingQuizRequests = new Map();

const request = async (path, body) => {
  const send = (accessToken) =>
    fetch(`${API_BASE}/api/practice${path}`, {
      method: body ? "POST" : "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

  let response = await send(await getAccessToken());
  if (response.status === 401) {
    response = await send((await refreshSession()).accessToken);
    if (response.status === 401) clearSession();
  }
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.error || "Unable to complete practice request.");
  }

  return data;
};

export const getPracticeQuiz = () => {
  const accessToken = localStorage.getItem("accessToken");
  const pendingRequest = pendingQuizRequests.get(accessToken);
  if (pendingRequest) return pendingRequest;

  const quizRequest = request("/quiz").finally(() => {
    pendingQuizRequests.delete(accessToken);
  });
  pendingQuizRequests.set(accessToken, quizRequest);
  return quizRequest;
};

export const submitPracticeAnswers = (answers) => request("/complete", answers);
export const feedPet = () => request("/pet/feed", {});
export const getLeaderboard = () => request("/leaderboard");
