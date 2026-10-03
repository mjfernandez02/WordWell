import vocabulary from "./Vocab.json";

const shuffle = (items) => {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
};

export const createPracticeQuiz = (questionCount = 5) =>
  shuffle(vocabulary)
    .slice(0, questionCount)
    .map((entry) => {
      // Matching parts of speech keep distractors plausible. Unique meanings
      // ensure that every question has exactly one correct answer.
      const distractors = [
        ...new Set(
          vocabulary
            .filter(
              (candidate) =>
                candidate.type === entry.type &&
                candidate.meaning !== entry.meaning,
            )
            .map((candidate) => candidate.meaning),
        ),
      ];
      const answers = shuffle([
        entry.meaning,
        ...shuffle(distractors).slice(0, 2),
      ]);

      return {
        word: entry.word,
        type: entry.type,
        example: entry.example,
        answers,
        correctAnswer: answers.indexOf(entry.meaning),
      };
    });
