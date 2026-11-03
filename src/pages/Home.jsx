import Footer from "../components/Footer";
import {
  FeatureCard,
  FeatureHeading,
  FeatureNumber,
  FeatureText,
  HeroActions,
  HeroHeading,
  HeroParagraph,
  HeroSeal,
  HomeFeatures,
  HomeHero,
  HomePage,
  LandingPrimary,
  LandingSecondary,
  OrbitWord,
  WordOrbit,
} from "../styles/Home.styles";

const Home = () => (
  <HomePage>
    <HomeHero>
      <HeroSeal>The daily vocabulary well</HeroSeal>
      <HeroHeading>
        Become truly <br /> <em>well-spoken.</em>
      </HeroHeading>
      <HeroParagraph>
        Dive into short, structured daily lessons that deepen your word bank,
        clear up your expression, and reward your growth.
      </HeroParagraph>
      <HeroActions>
        <LandingPrimary to="/signup">Start learning free</LandingPrimary>
        <LandingSecondary to="/login">
          I already have an account
        </LandingSecondary>
      </HeroActions>
      <WordOrbit aria-hidden="true">
        <OrbitWord placement="one">
          eloquent<small>expressive & persuasive</small>
        </OrbitWord>
        <OrbitWord placement="two">
          serendipity<small>a fortunate discovery</small>
        </OrbitWord>
        <OrbitWord placement="three">
          lucid<small>clear & easy to understand</small>
        </OrbitWord>
      </WordOrbit>
    </HomeHero>
    <HomeFeatures>
      <FeatureCard>
        <FeatureNumber>01</FeatureNumber>
        <FeatureHeading>Learn in context</FeatureHeading>
        <FeatureText>
          Memorable examples turn new words into language you can actually use.
        </FeatureText>
      </FeatureCard>
      <FeatureCard>
        <FeatureNumber>02</FeatureNumber>
        <FeatureHeading>Practice at the right time</FeatureHeading>
        <FeatureText>
          Quick review sessions strengthen recall without overwhelming your day.
        </FeatureText>
      </FeatureCard>
      <FeatureCard>
        <FeatureNumber>03</FeatureNumber>
        <FeatureHeading>Stay motivated</FeatureHeading>
        <FeatureText>
          Earn XP, build streaks, collect coins, and unlock rewards as you grow.
        </FeatureText>
      </FeatureCard>
    </HomeFeatures>
    <Footer />
  </HomePage>
);

export default Home;
