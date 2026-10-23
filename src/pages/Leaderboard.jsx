import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getLeaderboard } from "../services/practiceService";
import {
  LeaderboardCard,
  LeaderboardEntry,
  LeaderboardHeader,
  LeaderboardPage,
  LeaderboardRank,
  LeaderboardUser,
  LeaderboardXp,
} from "../styles/Leaderboard.styles";

const Leaderboard = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getLeaderboard()
      .then(({ leaderboard }) => {
        if (active) setEntries(leaderboard);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <LeaderboardPage>
      <LeaderboardHeader />
      <LeaderboardCard aria-label="XP leaderboard">
        <LeaderboardEntry header>
          <LeaderboardRank>Rank</LeaderboardRank>
          <LeaderboardUser>Learner</LeaderboardUser>
          <LeaderboardXp>Experience</LeaderboardXp>
        </LeaderboardEntry>
        {loading ? (
          <LeaderboardEntry role="status">Loading leaderboard...</LeaderboardEntry>
        ) : error ? (
          <LeaderboardEntry role="alert">{error}</LeaderboardEntry>
        ) : entries.length === 0 ? (
          <LeaderboardEntry>No learners on the leaderboard yet.</LeaderboardEntry>
        ) : (
          entries.map((entry) => (
            <LeaderboardEntry
              key={entry.userId}
              current={entry.userId === user?.id}
            >
              <LeaderboardRank>#{entry.rank}</LeaderboardRank>
              <LeaderboardUser>
                {entry.email || "Learner"}
                {entry.userId === user?.id ? " (You)" : ""}
              </LeaderboardUser>
              <LeaderboardXp>{entry.xp.toLocaleString()} XP</LeaderboardXp>
            </LeaderboardEntry>
          ))
        )}
      </LeaderboardCard>
    </LeaderboardPage>
  );
};

export default Leaderboard;
