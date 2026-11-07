import mascotMapleSrc from "../assets/mascot/maple.png";
import mascotTalkingSrc from "../assets/mascot/talking.png";
import mascotHappySrc from "../assets/mascot/happy.png";
import mascotThinkingSrc from "../assets/mascot/thinking.png";
import mascotExcitedSrc from "../assets/mascot/excited.png";
import mascotSadSrc from "../assets/mascot/sad.png";
import mascotSleepySrc from "../assets/mascot/sleepy.png";
import mascotIdeaSrc from "../assets/mascot/idea.png";
import mascotStarSrc from "../assets/mascot/star.png";
import mascotSupportiveSrc from "../assets/mascot/supportive.png";
import coinSrc from "../assets/coin.svg";
import coinGreenSrc from "../assets/coin-green.svg";
import cherrySrc from "../assets/cherry.svg";
import zapSrc from "../assets/zap.svg";

const mascotExpressions = {
  maple: mascotMapleSrc,
  idle: mascotMapleSrc,
  talking: mascotTalkingSrc,
  happy: mascotHappySrc,
  thinking: mascotThinkingSrc,
  excited: mascotExcitedSrc,
  confused: mascotThinkingSrc,
  sad: mascotSadSrc,
  sleepy: mascotSleepySrc,
  reading: mascotIdeaSrc,
  idea: mascotIdeaSrc,
  star: mascotStarSrc,
  sign: mascotSupportiveSrc,
  supportive: mascotSupportiveSrc,
};

export const Maple = ({
  alt = "Maple, your WordWell learning companion",
  mood = "idle",
  ...props
}) => (
  <img
    src={mascotExpressions[mood] || mascotExpressions.idle}
    alt={alt}
    {...props}
  />
);

export const Coin = ({ alt = "coin", ...props }) => (
  <img src={coinSrc} alt={alt} {...props} />
);

export const Zap = ({ alt = "zap", ...props }) => (
  <img src={zapSrc} alt={alt} {...props} />
);

export const Cherry = ({ alt = "cherries", ...props }) => (
  <img src={cherrySrc} alt={alt} {...props} />
);

export const CoinGreen = ({ alt = "coin", ...props }) => (
  <img src={coinGreenSrc} alt={alt} {...props} />
);
