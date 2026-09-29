import { useState } from "react";
import { Link } from "react-router-dom";
import { Maple } from "../components/Logos";
import { PetArtwork } from "../styles/Onboarding.styles";
import zapSrc from "../assets/zap.svg";
import coinSrc from "../assets/coin.svg";
import {
  AnswerFeedback,
  AnswerLetter,
  AnswerList,
  AnswerOption,
  AnswerPrompt,
  AnswerSection,
  AnswerText,
  CompletionCard,
  CompletionText,
  CompletionHeading,
  CompletionScore,
  CompletionRewards,
  CompletionReward,
  RewardIcon,
  RewardValue,
  RewardLabel,
  CompletionActions,
  VisitPetButton,
  ContinueButton,
  PracticeContent,
  PracticeFooter,
  PracticePage,
  PracticeProgressHeader,
  PracticeWord,
  QuestionCounter,
  QuestionProgressFill,
  QuestionProgressTrack,
  WordCard,
  WordType,
} from "../styles/Practice.styles";

const questions = [
  {
    word: "resilient",
    type: "adjective",
    answers: [
      "Able to withstand or recover quickly from difficult conditions.",
      "Showing a clear lack of interest, energy, or excitement.",
      "Strictly following conventional rules or traditional practices.",
    ],
    correctAnswer: 0,
  },
  {
    word: "lucid",
    type: "adjective",
    answers: [
      "Expressed clearly and easy to understand.",
      "Extremely old or belonging to a distant era.",
      "Likely to change suddenly without warning.",
    ],
    correctAnswer: 0,
  },
  {
    word: "meticulous",
    type: "adjective",
    answers: [
      "Unwilling to reveal thoughts or feelings.",
      "Showing great attention to every detail.",
      "Happening by chance in a fortunate way.",
    ],
    correctAnswer: 1,
  },
  {
    word: "pragmatic",
    type: "adjective",
    answers: [
      "Dealing with problems in a practical, realistic way.",
      "Having a strong desire to travel.",
      "Using more words than are necessary.",
    ],
    correctAnswer: 0,
  },
  {
    word: "eloquent",
    type: "adjective",
    answers: [
      "Quiet and unwilling to attract attention.",
      "Fluent or persuasive in speaking or writing.",
      "Difficult to find, catch, or achieve.",
    ],
    correctAnswer: 1,
  },
];

const answerLetters = ["A", "B", "C"];

const Practice = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);

  const question = questions[questionIndex];
  const isCorrect = selectedAnswer === question.correctAnswer;
  const progress = ((questionIndex + 1) / questions.length) * 100;

  const handleContinue = () => {
    if (selectedAnswer === null) return;

    if (isCorrect) setScore((currentScore) => currentScore + 1);

    if (questionIndex === questions.length - 1) {
      setComplete(true);
      return;
    }

    setQuestionIndex((currentIndex) => currentIndex + 1);
    setSelectedAnswer(null);
  };

  const restartPractice = () => {
    setQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setComplete(false);
  };

  if (complete) {
    return (
      <PracticePage py={{ base: "30px", md: "38px" }}>
        <PracticeContent>
          <CompletionCard>
            <PetArtwork
              width="104px"
              height="104px"
              margin="6px auto 30px"
              css={{
                "& img": { display: "block", width: "112px", height: "112px" },
              }}
            >
              <Maple />
            </PetArtwork>
            <CompletionHeading>Practice Complete!</CompletionHeading>
            <CompletionText>
              You got{" "}
              <CompletionScore>
                {score} out of {questions.length}
              </CompletionScore>{" "}
              correct today.
            </CompletionText>
            <CompletionRewards>
              <CompletionReward>
                <RewardIcon source={zapSrc} />
                <RewardValue>+{score * 20} XP</RewardValue>
                <RewardLabel>Experience Points</RewardLabel>
              </CompletionReward>
              <CompletionReward reward>
                <RewardIcon source={coinSrc} />
                <RewardValue>+{score * 5} Coins</RewardValue>
                <RewardLabel>Bonus Gold</RewardLabel>
              </CompletionReward>
            </CompletionRewards>
            <CompletionActions>
              <VisitPetButton asChild>
                <Link to="/pet">Visit my pet</Link>
              </VisitPetButton>
              <ContinueButton
                width="100%"
                borderRadius="12px"
                onClick={restartPractice}
              >
                Practice again
              </ContinueButton>
            </CompletionActions>
          </CompletionCard>
        </PracticeContent>
      </PracticePage>
    );
  }

  return (
    <PracticePage>
      <PracticeContent>
        <PracticeProgressHeader>
          <QuestionCounter>
            Question {questionIndex + 1} of {questions.length}
          </QuestionCounter>
          <QuestionProgressTrack
            role="progressbar"
            aria-label="Practice progress"
            aria-valuemin="1"
            aria-valuemax={questions.length}
            aria-valuenow={questionIndex + 1}
          >
            <QuestionProgressFill width={`${progress}%`} />
          </QuestionProgressTrack>
        </PracticeProgressHeader>

        <WordCard>
          <PracticeWord>{question.word}</PracticeWord>
          <WordType>{question.type}</WordType>
        </WordCard>

        <AnswerSection aria-labelledby="answer-prompt">
          <AnswerPrompt id="answer-prompt">
            Select the correct meaning:
          </AnswerPrompt>
          <AnswerList>
            {question.answers.map((answer, index) => (
              <AnswerOption
                key={answer}
                selected={selectedAnswer === index}
                aria-pressed={selectedAnswer === index}
                onClick={() => setSelectedAnswer(index)}
              >
                <AnswerLetter>{answerLetters[index]}</AnswerLetter>
                <AnswerText>{answer}</AnswerText>
              </AnswerOption>
            ))}
          </AnswerList>

          <PracticeFooter aria-live="polite">
            {selectedAnswer !== null && (
              <>
                <AnswerFeedback correct={isCorrect}>
                  {isCorrect
                    ? "Correct — nicely done."
                    : "Not quite. You can continue and review it again later."}
                </AnswerFeedback>
                <ContinueButton onClick={handleContinue}>
                  {questionIndex === questions.length - 1
                    ? "Finish"
                    : "Continue →"}
                </ContinueButton>
              </>
            )}
          </PracticeFooter>
        </AnswerSection>
      </PracticeContent>
    </PracticePage>
  );
};

export default Practice;
