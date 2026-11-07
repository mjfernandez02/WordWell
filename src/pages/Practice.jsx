import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Maple } from "../components/Logos";
import { useAuth } from "../hooks/useAuth";
import {
  checkPracticeAnswer,
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
  const [hasStarted, setHasStarted] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [answerFeedback, setAnswerFeedback] = useState(null);
  const [result, setResult] = useState(null);
  const [complete, setComplete] = useState(false);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!hasStarted) return undefined;
    let active = true;

    getPracticeQuiz()
      .then((newQuiz) => {
        if (!active) return;
        setQuiz(newQuiz);
        setQuestionIndex(0);
        setAnswers({});
        setAnswerFeedback(null);
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
  }, [hasStarted, quizRequest]);

  if (!hasStarted) {
    return (
      <PracticePage py={{ base: "30px", md: "38px" }}>
        <PracticeContent maxW="608px">
          <CompletionCard>
            <PetArtwork
              width="126px"
              height="126px"
              margin="0 auto 24px"
              css={{
                "& img": { display: "block", width: "146px", height: "146px" },
              }}
            >
              <Maple mood="supportive" />
            </PetArtwork>
            <CompletionHeading>Ready for a quiz?</CompletionHeading>
            <CompletionText>
              Your quiz will be prepared once you begin. Take your
              time—there&apos;s no question waiting until you&apos;re ready.
            </CompletionText>
            <ContinueButton
              width="100%"
              borderRadius="12px"
              onClick={() => {
                setError("");
                setLoadingQuiz(true);
                setHasStarted(true);
              }}
            >
              Start quiz
            </ContinueButton>
          </CompletionCard>
        </PracticeContent>
      </PracticePage>
    );
  }

  if (loadingQuiz) {
    return (
      <PracticePage>
        <PracticeContent maxW="608px">Loading your quiz...</PracticeContent>
      </PracticePage>
    );
  }

  if (!quiz) {
    return (
      <PracticePage py={{ base: "30px", md: "38px" }}>
        <PracticeContent>
          <CompletionCard>
            <CompletionHeading>Quiz unavailable</CompletionHeading>
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

  const handleCheckAnswer = async () => {
    if (!answered || submitting) return;

    setSubmitting(true);
    setError("");
    try {
      const feedback = await checkPracticeAnswer({
        quizId: quiz.quizId,
        questionId: question.id,
        optionId: selectedOptionId,
      });
      setAnswerFeedback(feedback);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleContinue = async () => {
    if (!answerFeedback || submitting) return;

    if (questionIndex < quiz.questions.length - 1) {
      setQuestionIndex((currentIndex) => currentIndex + 1);
      setAnswerFeedback(null);
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
              <Maple mood="excited" />
            </PetArtwork>
            <CompletionHeading>Quiz Complete!</CompletionHeading>
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
                <Link to="/rewards">View rewards</Link>
              </VisitPetButton>
              <ContinueButton
                width="100%"
                borderRadius="12px"
                onClick={() => {
                  setQuiz(null);
                  setComplete(false);
                  setResult(null);
                  setAnswers({});
                  setAnswerFeedback(null);
                  setError("");
                  setHasStarted(false);
                }}
              >
                Take another quiz
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
            aria-label="Quiz progress"
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
              const optionResult = answerFeedback
                ? option.id === answerFeedback.correctOptionId
                  ? "correct"
                  : selected
                    ? "incorrect"
                    : "muted"
                : selected
                  ? "selected"
                  : "unanswered";
              return (
                <AnswerOption
                  key={option.id}
                  result={optionResult}
                  aria-pressed={selected}
                  disabled={submitting || Boolean(answerFeedback)}
                  aria-label={`${answerLetters[index]}. ${option.text}${selected ? ". Selected answer" : ""}`}
                  onClick={() =>
                    setAnswers((currentAnswers) => ({
                      ...currentAnswers,
                      [question.id]: option.id,
                    }))
                  }
                >
                  <AnswerLetter result={optionResult} aria-hidden="true">
                    {answerLetters[index]}
                  </AnswerLetter>
                  <AnswerText>{option.text}</AnswerText>
                </AnswerOption>
              );
            })}
          </AnswerList>

          {answered && !answerFeedback && (
            <PracticeFooter correct>
              <FeedbackPet>
                <Maple mood="thinking" alt="" />
              </FeedbackPet>
              <FeedbackCopy>
                <AnswerFeedback correct>
                  Is this your final answer?
                </AnswerFeedback>
                <FeedbackExample>
                  You will see the correct answer after you confirm.
                </FeedbackExample>
                {error && (
                  <FeedbackExample role="alert">{error}</FeedbackExample>
                )}
              </FeedbackCopy>
              <ContinueButton
                onClick={handleCheckAnswer}
                disabled={submitting}
                width={{ base: "100%", sm: "auto" }}
              >
                {submitting ? "Checking..." : "Yes, submit"}
              </ContinueButton>
              <VisitPetButton
                onClick={() =>
                  setAnswers((currentAnswers) => {
                    const nextAnswers = { ...currentAnswers };
                    delete nextAnswers[question.id];
                    return nextAnswers;
                  })
                }
                disabled={submitting}
                width={{ base: "100%", sm: "auto" }}
              >
                Change answer
              </VisitPetButton>
            </PracticeFooter>
          )}
          {answerFeedback && (
            <PracticeFooter correct={answerFeedback.correct}>
              <FeedbackPet>
                <Maple mood={answerFeedback.correct ? "happy" : "sad"} alt="" />
              </FeedbackPet>
              <FeedbackCopy>
                <AnswerFeedback correct={answerFeedback.correct}>
                  {answerFeedback.correct ? "Correct!" : "Not quite."}
                </AnswerFeedback>
                <FeedbackExample>
                  Correct answer:{" "}
                  {
                    question.options.find(
                      (option) => option.id === answerFeedback.correctOptionId,
                    )?.text
                  }
                </FeedbackExample>
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
                  ? "Finishing..."
                  : questionIndex === quiz.questions.length - 1
                    ? "Finish quiz"
                    : "Next question"}
              </ContinueButton>
            </PracticeFooter>
          )}
        </AnswerSection>
      </PracticeContent>
    </PracticePage>
  );
};

export default Practice;
