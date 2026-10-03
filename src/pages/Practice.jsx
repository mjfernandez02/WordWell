import { useState } from "react";
import { createPracticeQuiz } from "../utils/practiceQuiz";
import { Link } from "react-router-dom";
import { Maple } from "../components/Logos";
import { PetArtwork } from "../styles/Onboarding.styles";
import zapSrc from "../assets/zap.svg";
import coinSrc from "../assets/coin.svg";
import {
  AnswerFeedback,
  FeedbackCopy,
  FeedbackExample,
  FeedbackPet,
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

const answerLetters = ["A", "B", "C"];

const Practice = () => {
  const [questions, setQuestions] = useState(() => createPracticeQuiz());
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [complete, setComplete] = useState(false);

  const question = questions[questionIndex];
  const answered = selectedAnswer !== null;
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
    setQuestions(createPracticeQuiz());
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
      <PracticeContent maxW="608px">
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
          <AnswerPrompt id="answer-prompt" srOnly={answered}>
            Select the correct meaning:
          </AnswerPrompt>
          <AnswerList>
            {question.answers.map((answer, index) => {
              const result = !answered
                ? "unanswered"
                : index === question.correctAnswer
                  ? "correct"
                  : index === selectedAnswer
                    ? "incorrect"
                    : "muted";
              return (
                <AnswerOption
                  key={answer}
                  result={result}
                  aria-pressed={selectedAnswer === index}
                  aria-disabled={answered}
                  aria-label={`${answerLetters[index]}. ${answer}${result === "correct" ? ". Correct answer" : result === "incorrect" ? ". Your answer, incorrect" : ""}`}
                  onClick={() => {
                    if (!answered) setSelectedAnswer(index);
                  }}
                >
                  <AnswerLetter result={result} aria-hidden="true">
                    {result === "correct"
                      ? "\u2713"
                      : result === "incorrect"
                        ? "\u00d7"
                        : answerLetters[index]}
                  </AnswerLetter>
                  <AnswerText>{answer}</AnswerText>
                </AnswerOption>
              );
            })}
          </AnswerList>

          <div aria-live="polite" aria-atomic="true">
            {answered && (
              <PracticeFooter correct={isCorrect}>
                <FeedbackPet>
                  <Maple alt="" />
                </FeedbackPet>
                <FeedbackCopy>
                  <AnswerFeedback correct={isCorrect}>
                    {isCorrect
                      ? "Correct \u2014 nicely done!"
                      : "Not quite \u2014 keep going!"}
                  </AnswerFeedback>
                  <FeedbackExample>
                    Example: <strong>"{question.example}"</strong>
                  </FeedbackExample>
                </FeedbackCopy>
                <ContinueButton
                  onClick={handleContinue}
                  background={
                    isCorrect ? "app.action.default" : "app.reward.default"
                  }
                  _hover={{
                    background: isCorrect
                      ? "app.action.hover"
                      : "app.reward.hover",
                  }}
                  width={{ base: "100%", sm: "auto" }}
                >
                  {questionIndex === questions.length - 1
                    ? "Finish"
                    : "Next word"}
                </ContinueButton>
              </PracticeFooter>
            )}
          </div>
        </AnswerSection>
      </PracticeContent>
    </PracticePage>
  );
};

export default Practice;
