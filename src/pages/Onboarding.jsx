import {
  DashboardMain,
  GoalCard,
  GoalCount,
  GoalDescription,
  GoalHeader,
  GoalTitle,
  OnboardingLeftColumn,
  OnboardingPage,
  PetAction,
  PetArtwork,
  PetCard,
  PetDivider,
  PetHeading,
  PetText,
  PrimaryAction,
  ProgressFill,
  ProgressTrack,
  WelcomeCard,
  WelcomeHeading,
  WelcomeText,
} from "../styles/Onboarding.styles";
import { Maple } from "../components/Logos";

const ArrowIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M4 10h11M11 5l5 5-5 5"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Onboarding = () => (
  <OnboardingPage>
    <DashboardMain>
      <OnboardingLeftColumn>
        <WelcomeCard>
          <WelcomeHeading>
            Welcome to WordWell! <span aria-hidden="true">👋</span>
          </WelcomeHeading>
          <WelcomeText>
            Ready to make your English vocabulary resilient and powerful today?
            <br />
            Let&apos;s take Maple the Fox on a learning journey!
          </WelcomeText>
          <PrimaryAction to="/quiz">
            Start quiz <ArrowIcon />
          </PrimaryAction>
        </WelcomeCard>

        <GoalCard>
          <GoalHeader>
            <GoalTitle>Daily Goal</GoalTitle>
            <GoalCount>0 / 5 words reviewed</GoalCount>
          </GoalHeader>
          <ProgressTrack
            role="progressbar"
            aria-label="Daily goal progress"
            aria-valuemin="0"
            aria-valuemax="5"
            aria-valuenow="0"
          >
            <ProgressFill />
          </ProgressTrack>
          <GoalDescription>
            Complete today&apos;s quiz to hit your daily goal and
            earn bonus coins!
          </GoalDescription>
        </GoalCard>
      </OnboardingLeftColumn>

      <PetCard id="pet">
        <PetArtwork>
          <Maple />
        </PetArtwork>
        <PetHeading>Maple is relaxed</PetHeading>
        <PetText>
          Keep practicing to earn coins and feed your
          <br /> cute companion!
        </PetText>
        <PetDivider />
        <PetAction to="/onboarding#pet">
          Visit my pet <ArrowIcon />
        </PetAction>
      </PetCard>
    </DashboardMain>
  </OnboardingPage>
);

export default Onboarding;
