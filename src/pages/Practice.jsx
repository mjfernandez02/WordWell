import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Maple } from "../components/Logos";
import { useAuth } from "../hooks/useAuth";
import {
  getPracticeQuiz,
  submitPracticeAnswers,
} from "../services/practiceService";
import { PetArtwork } from "../styles/Onboarding.styles";
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
import zapSrc from "../assets/zap.svg";
import coinSrc from "../assets/coin.svg";

const answerLetters = ["A", "B", "C"];

const Practice = () => {
  const { updateProgress } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [quizRequest, setQuizRequest] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [complete, setComplete] = useState(false);
  const [loadingQuiz, setLoadingQuiz] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getPracticeQuiz()
      .then((newQuiz) => {
        if (!active) return;
        setQuiz(newQuiz);
        setQuestionIndex(0);
        setAnswers({});
        setResult(null);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoadingQuiz(false);
      });

    return () => {
      active = false;
    };
  }, [quizRequest]);

  if (loadingQuiz) {
    return (
      <PracticePage>
        <PracticeContent maxW="608px">
          Loading your practice quiz...
        </PracticeContent>
      </PracticePage>
    );
  }

  if (!quiz) {
    return (
      <PracticePage py={{ base: "30px", md: "38px" }}>
        <PracticeContent>
          <CompletionCard>
            <CompletionHeading>Practice unavailable</CompletionHeading>
            <CompletionText>{error}</CompletionText>
            <ContinueButton
              width="100%"
              borderRadius="12px"
              onClick={() => {
                setLoadingQuiz(true);
                setError("");
                setQuizRequest((request) => request + 1);
              }}
            >
              Try again
            </ContinueButton>
          </CompletionCard>
        </PracticeContent>
      </PracticePage>
    );
  }

  const question = quiz.questions[questionIndex];
  const selectedOptionId = answers[question.id] ?? null;
  const answered = selectedOptionId !== null;
  const progress = ((questionIndex + 1) / quiz.questions.length) * 100;

  const handleContinue = async () => {
    if (!answered || submitting) return;

    if (questionIndex < quiz.questions.length - 1) {
      setQuestionIndex((currentIndex) => currentIndex + 1);
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const completion = await submitPracticeAnswers({
        quizId: quiz.quizId,
        answers: quiz.questions.map((currentQuestion) => ({
          questionId: currentQuestion.id,
          optionId: answers[currentQuestion.id],
        })),
      });
      setResult(completion);
      updateProgress(completion);
      setComplete(true);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
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
                {result.correctAnswers} out of {result.totalQuestions}
              </CompletionScore>{" "}
              correct today.
            </CompletionText>
            <CompletionRewards>
              <CompletionReward>
                <RewardIcon source={zapSrc} />
                <RewardValue>+{result.xpAwarded} XP</RewardValue>
                <RewardLabel>Experience Points</RewardLabel>
              </CompletionReward>
              <CompletionReward reward>
                <RewardIcon source={coinSrc} />
                <RewardValue>+{result.pointsAwarded} Coins</RewardValue>
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
                onClick={() => {
                  setQuiz(null);
                  setComplete(false);
                  setResult(null);
                  setAnswers({});
                  setLoadingQuiz(true);
                  setError("");
                  setQuizRequest((request) => request + 1);
                }}
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
            Question {questionIndex + 1} of {quiz.questions.length}
          </QuestionCounter>
          <QuestionProgressTrack
            role="progressbar"
            aria-label="Practice progress"
            aria-valuemin="1"
            aria-valuemax={quiz.questions.length}
            aria-valuenow={questionIndex + 1}
          >
            <QuestionProgressFill width={`${progress}%`} />
          </QuestionProgressTrack>
        </PracticeProgressHeader>

        <WordCard>
          <PracticeWord>{question.word}</PracticeWord>
          <WordType>{question.type}</WordType>
          {question.example && (
            <FeedbackExample marginTop="16px" fontSize="14px">
              Example: <q>{question.example}</q>
            </FeedbackExample>
          )}
        </WordCard>

        <AnswerSection aria-labelledby="answer-prompt">
          <AnswerPrompt id="answer-prompt" srOnly={answered}>
            Select the correct meaning:
          </AnswerPrompt>
          <AnswerList>
            {question.options.map((option, index) => {
              const selected = selectedOptionId === option.id;
              return (
                <AnswerOption
                  key={option.id}
                  result={selected ? "selected" : "unanswered"}
                  aria-pressed={selected}
                  disabled={submitting}
                  aria-label={`${answerLetters[index]}. ${option.text}${selected ? ". Selected answer" : ""}`}
                  onClick={() =>
                    setAnswers((currentAnswers) => ({
                      ...currentAnswers,
                      [question.id]: option.id,
                    }))
                  }
                >
                  <AnswerLetter
                    result={selected ? "selected" : "unanswered"}
                    aria-hidden="true"
                  >
                    {answerLetters[index]}
                  </AnswerLetter>
                  <AnswerText>{option.text}</AnswerText>
                </AnswerOption>
              );
            })}
          </AnswerList>

          {answered && (
            <PracticeFooter correct>
              <FeedbackPet>
                <Maple alt="" />
              </FeedbackPet>
              <FeedbackCopy>
                <AnswerFeedback correct>Answer saved</AnswerFeedback>
                {error && (
                  <FeedbackExample role="alert">{error}</FeedbackExample>
                )}
              </FeedbackCopy>
              <ContinueButton
                onClick={handleContinue}
                disabled={submitting}
                width={{ base: "100%", sm: "auto" }}
              >
                {submitting
                  ? "Checking..."
                  : questionIndex === quiz.questions.length - 1
                    ? "Finish"
                    : "Next word"}
              </ContinueButton>
            </PracticeFooter>
          )}
        </AnswerSection>
      </PracticeContent>
    </PracticePage>
  );
};

export default Practice;
