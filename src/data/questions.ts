
export interface Question {
  id: number;
  text: string;
  options: {
    [key: string]: string;
  };
  correctOption: string;
  type: 'grammar' | 'vocabulary' | 'reading' | 'comprehension';
}

export const questions: Question[] = [
  {
    id: 1,
    text: "She _____ to the store yesterday.",
    options: {
      a: "go",
      b: "goes",
      c: "went",
      d: "gone"
    },
    correctOption: "c",
    type: "grammar"
  },
  {
    id: 2,
    text: "If I _____ rich, I would travel the world.",
    options: {
      a: "am",
      b: "were",
      c: "was",
      d: "be"
    },
    correctOption: "b",
    type: "grammar"
  },
  {
    id: 3,
    text: "Choose the word that means 'to make something less severe':",
    options: {
      a: "mitigate",
      b: "aggravate",
      c: "precipitate",
      d: "exacerbate"
    },
    correctOption: "a",
    type: "vocabulary"
  },
  {
    id: 4,
    text: "The antonym of 'benevolent' is:",
    options: {
      a: "kind",
      b: "charitable",
      c: "malevolent",
      d: "generous"
    },
    correctOption: "c",
    type: "vocabulary"
  },
  {
    id: 5,
    text: "By the time I _____ home, they had already left.",
    options: {
      a: "get",
      b: "got",
      c: "have gotten",
      d: "had gotten"
    },
    correctOption: "b",
    type: "grammar"
  },
  {
    id: 6,
    text: "We can't leave until the work _____.",
    options: {
      a: "will finish",
      b: "is finishing",
      c: "is finished",
      d: "finishes"
    },
    correctOption: "c",
    type: "grammar"
  },
  {
    id: 7,
    text: "The company's profits have _____ by 15% this year.",
    options: {
      a: "increased",
      b: "raised",
      c: "risen",
      d: "heightened"
    },
    correctOption: "a",
    type: "vocabulary"
  },
  {
    id: 8,
    text: "Neither John nor his sisters _____ going to the party.",
    options: {
      a: "is",
      b: "are",
      c: "was",
      d: "were"
    },
    correctOption: "b",
    type: "grammar"
  },
  {
    id: 9,
    text: "She's the woman _____ son won the competition.",
    options: {
      a: "who",
      b: "whom",
      c: "whose",
      d: "which"
    },
    correctOption: "c",
    type: "grammar"
  },
  {
    id: 10,
    text: "The project was completed _____ schedule.",
    options: {
      a: "in",
      b: "on",
      c: "at",
      d: "by"
    },
    correctOption: "b",
    type: "grammar"
  },
  {
    id: 11,
    text: "What's the _____ of your visit to our city?",
    options: {
      a: "purpose",
      b: "reason",
      c: "cause",
      d: "intention"
    },
    correctOption: "a",
    type: "vocabulary"
  },
  {
    id: 12,
    text: "She spoke so _____ that I couldn't understand her.",
    options: {
      a: "quickly",
      b: "fastly",
      c: "rapid",
      d: "speed"
    },
    correctOption: "a",
    type: "grammar"
  },
  {
    id: 13,
    text: "I'd rather you _____ tell anyone about this.",
    options: {
      a: "don't",
      b: "won't",
      c: "didn't",
      d: "wouldn't"
    },
    correctOption: "c",
    type: "grammar"
  },
  {
    id: 14,
    text: "A person who is 'loquacious' tends to be:",
    options: {
      a: "quiet",
      b: "talkative",
      c: "angry",
      d: "generous"
    },
    correctOption: "b",
    type: "vocabulary"
  },
  {
    id: 15,
    text: "The study was conducted with the _____ of determining the cause of the disease.",
    options: {
      a: "concept",
      b: "thought",
      c: "aim",
      d: "meaning"
    },
    correctOption: "c",
    type: "vocabulary"
  }
];
