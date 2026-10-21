import { Cherry, CoinGreen, Maple } from "../components/Logos";
import {
  FeedAction,
  FeedDescription,
  FeedIcon,
  FeedItem,
  FeedTitle,
  PetMessage,
  PetMessageIcon,
  PetName,
  PetPage,
  PetPanel,
  PetStatus,
  PetStatusIcon,
  PetTitle,
} from "../styles/MyPet.styles";
import { PetArtwork } from "../styles/Onboarding.styles";
import { useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { feedPet } from "../services/practiceService";

const MyPet = () => {
  const { user, updateProgress } = useAuth();
  const [feeding, setFeeding] = useState(false);
  const [fed, setFed] = useState(false);
  const [message, setMessage] = useState("");
  const pending = useRef(false);
  const handleFeed = async () => {
    if (pending.current) return;
    pending.current = true;
    setFeeding(true);
    setMessage("");
    try {
      const progress = await feedPet();
      updateProgress(progress);
      setFed(true);
      setMessage("Yum! Thank you for the delicious berries.");
    } catch (err) {
      setMessage(err.message || "Unable to feed Maple. Please try again.");
    } finally {
      pending.current = false;
      setFeeding(false);
    }
  };
  return (
    <PetPage>
      <PetPanel>
        <PetArtwork>
          <Maple />
        </PetArtwork>
        <PetTitle>
          <PetName>Maple the Fox</PetName>
          <PetStatus>
            {fed ? "Feeling happy!" : "Feeling hungry!"}
            <PetStatusIcon>
              <Cherry alt="" />
            </PetStatusIcon>
          </PetStatus>
        </PetTitle>

        <FeedItem>
          <FeedIcon>
            <Cherry alt="" />
          </FeedIcon>
          <div>
            <FeedTitle>Tasty Wild Berries</FeedTitle>
            <FeedDescription>
              Feed Maple to make her happy and warm!
            </FeedDescription>
          </div>
          <FeedAction
            type="button"
            onClick={handleFeed}
            disabled={feeding || (user?.points ?? 0) < 10}
          >
            Feed — 10 coins
            <CoinGreen alt="" />
          </FeedAction>
        </FeedItem>

        <PetMessage>
          <PetMessageIcon>
            <Cherry alt="" />
          </PetMessageIcon>
          <span role="status">
            {message ||
              ((user?.points ?? 0) < 10
                ? "Earn 10 coins through practice to feed Maple."
                : "Maple would love some berries!")}
          </span>
        </PetMessage>
      </PetPanel>
    </PetPage>
  );
};

export default MyPet;
