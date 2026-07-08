import { Question, QuestionCategory, questionsBank } from '../data/questions';

export interface ExamQuestion extends Omit<Question, 'options'> {
  options: { key: string; value: string }[];
}

/**
 * Shuffles an array in place using Fisher-Yates algorithm.
 */
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Selects a random subset of questions from a specific category.
 */
function getRandomQuestionsByCategory(
  category: QuestionCategory,
  count: number
): Question[] {
  const categoryQuestions = questionsBank.filter(q => q.category === category);
  return shuffleArray(categoryQuestions).slice(0, count);
}

/**
 * Transforms options into a shuffled array format to randomize answer positions.
 * The original option key (a, b, c, d) is preserved as 'originalKey' to check the answer.
 */
function prepareExamQuestion(question: Question): ExamQuestion {
  const optionsArray = Object.entries(question.options).map(([key, value]) => ({
    key, // this is the original key (a, b, c, d) that corresponds to correctAnswer
    value,
  }));

  return {
    ...question,
    options: shuffleArray(optionsArray),
  };
}

/**
 * Generates a new random exam with a balanced distribution of questions.
 */
export function generateRandomExam(totalQuestions: number = 20): ExamQuestion[] {
  // Define distribution (e.g., 40% grammar, 30% vocabulary, 20% reading, 10% listening)
  const distribution = {
    grammar: Math.round(totalQuestions * 0.4),
    vocabulary: Math.round(totalQuestions * 0.3),
    reading: Math.round(totalQuestions * 0.2),
    listening: Math.round(totalQuestions * 0.1),
  };

  // Adjust in case of rounding issues to ensure exact total
  const currentTotal = Object.values(distribution).reduce((a, b) => a + b, 0);
  if (currentTotal !== totalQuestions) {
    distribution.grammar += (totalQuestions - currentTotal);
  }

  const selectedQuestions = [
    ...getRandomQuestionsByCategory('grammar', distribution.grammar),
    ...getRandomQuestionsByCategory('vocabulary', distribution.vocabulary),
    ...getRandomQuestionsByCategory('reading', distribution.reading),
    ...getRandomQuestionsByCategory('listening', distribution.listening),
  ];

  // If we couldn't fulfill the exact number (e.g. not enough questions in bank), 
  // pad with random unselected questions
  if (selectedQuestions.length < totalQuestions) {
    const remainingCount = totalQuestions - selectedQuestions.length;
    const selectedIds = new Set(selectedQuestions.map(q => q.id));
    const remainingQuestions = questionsBank.filter(q => !selectedIds.has(q.id));
    selectedQuestions.push(...shuffleArray(remainingQuestions).slice(0, remainingCount));
  }

  // Shuffle the final list and prepare options
  return shuffleArray(selectedQuestions).map(prepareExamQuestion);
}
