export type QuestionCategory = 'grammar' | 'vocabulary' | 'reading' | 'listening';

export interface Question {
  id: string;
  type?: string;
  category: QuestionCategory;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  question: string;
  options: {
    [key: string]: string;
  };
  correctAnswer: string;
  explanation?: string;
  audioUrl?: string;
  transcript?: string;
}

export const questionsBank: Question[] = [
  // GRAMMAR - BEGINNER (1-5)
  {
    id: "g_b_1",
    type: "multiple-choice",
    question: "She _____ to the store yesterday.",
    options: { a: "go", b: "goes", c: "went", d: "gone" },
    correctAnswer: "c",
    explanation: "'Yesterday' indicates the past tense. The simple past of 'go' is 'went'.",
    category: "grammar",
    difficulty: "beginner"
  },
  {
    id: "g_b_2",
    type: "multiple-choice",
    question: "I _____ a student.",
    options: { a: "am", b: "is", c: "are", d: "be" },
    correctAnswer: "a",
    explanation: "The first-person singular form of the verb 'to be' is 'am'.",
    category: "grammar",
    difficulty: "beginner"
  },
  {
    id: "g_b_3",
    type: "multiple-choice",
    question: "They _____ playing football right now.",
    options: { a: "is", b: "are", c: "was", d: "were" },
    correctAnswer: "b",
    explanation: "The present continuous tense for 'they' uses 'are'.",
    category: "grammar",
    difficulty: "beginner"
  },
  {
    id: "g_b_4",
    type: "multiple-choice",
    question: "He doesn't _____ any brothers.",
    options: { a: "has", b: "having", c: "had", d: "have" },
    correctAnswer: "d",
    explanation: "After 'does not' (doesn't), we use the base form of the verb, which is 'have'.",
    category: "grammar",
    difficulty: "beginner"
  },
  {
    id: "g_b_5",
    type: "multiple-choice",
    question: "We _____ to Paris last year.",
    options: { a: "travel", b: "travelled", c: "traveling", d: "travels" },
    correctAnswer: "b",
    explanation: "'Last year' requires the past tense, which is 'travelled'.",
    category: "grammar",
    difficulty: "beginner"
  },

  // GRAMMAR - INTERMEDIATE (6-15)
  {
    id: "g_i_1",
    type: "multiple-choice",
    question: "If I _____ rich, I would travel the world.",
    options: { a: "am", b: "were", c: "was", d: "be" },
    correctAnswer: "b",
    explanation: "In the second conditional, 'were' is used for all subjects in formal English.",
    category: "grammar",
    difficulty: "intermediate"
  },
  {
    id: "g_i_2",
    type: "multiple-choice",
    question: "By the time I _____ home, they had already left.",
    options: { a: "get", b: "got", c: "have gotten", d: "had gotten" },
    correctAnswer: "b",
    explanation: "We use the simple past ('got') for the action that happened second.",
    category: "grammar",
    difficulty: "intermediate"
  },
  {
    id: "g_i_3",
    type: "multiple-choice",
    question: "We can't leave until the work _____.",
    options: { a: "will finish", b: "is finishing", c: "is finished", d: "finishes" },
    correctAnswer: "c",
    explanation: "In a time clause referring to the future, we use the present simple or present perfect.",
    category: "grammar",
    difficulty: "intermediate"
  },
  {
    id: "g_i_4",
    type: "multiple-choice",
    question: "Neither John nor his sisters _____ going to the party.",
    options: { a: "is", b: "are", c: "was", d: "were" },
    correctAnswer: "b",
    explanation: "With 'neither...nor', the verb agrees with the subject closest to it ('sisters').",
    category: "grammar",
    difficulty: "intermediate"
  },
  {
    id: "g_i_5",
    type: "multiple-choice",
    question: "She's the woman _____ son won the competition.",
    options: { a: "who", b: "whom", c: "whose", d: "which" },
    correctAnswer: "c",
    explanation: "'Whose' indicates possession, referring to the woman's son.",
    category: "grammar",
    difficulty: "intermediate"
  },
  {
    id: "g_i_6",
    type: "multiple-choice",
    question: "The project was completed _____ schedule.",
    options: { a: "in", b: "on", c: "at", d: "by" },
    correctAnswer: "b",
    explanation: "The correct preposition for being on time according to a plan is 'on schedule'.",
    category: "grammar",
    difficulty: "intermediate"
  },
  {
    id: "g_i_7",
    type: "multiple-choice",
    question: "She spoke so _____ that I couldn't understand her.",
    options: { a: "quickly", b: "fastly", c: "rapid", d: "speed" },
    correctAnswer: "a",
    explanation: "'Quickly' is an adverb describing how she spoke. 'Fastly' does not exist.",
    category: "grammar",
    difficulty: "intermediate"
  },
  {
    id: "g_i_8",
    type: "multiple-choice",
    question: "I'd rather you _____ tell anyone about this.",
    options: { a: "don't", b: "won't", c: "didn't", d: "wouldn't" },
    correctAnswer: "c",
    explanation: "After 'would rather' with a different subject, we use the past tense ('didn't') to express preference.",
    category: "grammar",
    difficulty: "intermediate"
  },
  {
    id: "g_i_9",
    type: "multiple-choice",
    question: "You _____ have left your keys in the car.",
    options: { a: "should", b: "might", c: "can", d: "ought" },
    correctAnswer: "b",
    explanation: "'Might' expresses possibility in the past.",
    category: "grammar",
    difficulty: "intermediate"
  },
  {
    id: "g_i_10",
    type: "multiple-choice",
    question: "Hardly had I arrived _____ it started to rain.",
    options: { a: "than", b: "when", c: "then", d: "after" },
    correctAnswer: "b",
    explanation: "'Hardly' is followed by 'when' in inverted sentences.",
    category: "grammar",
    difficulty: "intermediate"
  },

  // GRAMMAR - ADVANCED (16-20)
  {
    id: "g_a_1",
    type: "multiple-choice",
    question: "Not only _____ late, but she also forgot her presentation.",
    options: { a: "did she arrive", b: "she arrived", c: "arrived she", d: "she did arrive" },
    correctAnswer: "a",
    explanation: "When 'Not only' begins a sentence, subject-verb inversion is required.",
    category: "grammar",
    difficulty: "advanced"
  },
  {
    id: "g_a_2",
    type: "multiple-choice",
    question: "Had I known about the traffic, I _____ earlier.",
    options: { a: "will leave", b: "would leave", c: "would have left", d: "had left" },
    correctAnswer: "c",
    explanation: "Third conditional inversion: 'Had I known' means 'If I had known', followed by 'would have + past participle'.",
    category: "grammar",
    difficulty: "advanced"
  },
  {
    id: "g_a_3",
    type: "multiple-choice",
    question: "It is imperative that he _____ present at the meeting.",
    options: { a: "is", b: "be", c: "was", d: "will be" },
    correctAnswer: "b",
    explanation: "The subjunctive mood uses the base form 'be' after 'imperative that'.",
    category: "grammar",
    difficulty: "advanced"
  },
  {
    id: "g_a_4",
    type: "multiple-choice",
    question: "No sooner had we sat down _____ the phone rang.",
    options: { a: "when", b: "than", c: "then", d: "that" },
    correctAnswer: "b",
    explanation: "'No sooner' is always paired with 'than'.",
    category: "grammar",
    difficulty: "advanced"
  },
  {
    id: "g_a_5",
    type: "multiple-choice",
    question: "He was accused _____ stealing the money.",
    options: { a: "for", b: "of", c: "about", d: "with" },
    correctAnswer: "b",
    explanation: "The correct preposition after 'accused' is 'of'.",
    category: "grammar",
    difficulty: "advanced"
  },

  // VOCABULARY - BEGINNER (21-25)
  {
    id: "v_b_1",
    type: "multiple-choice",
    question: "My brother is my father's _____.",
    options: { a: "daughter", b: "son", c: "uncle", d: "nephew" },
    correctAnswer: "b",
    explanation: "A male child is a son.",
    category: "vocabulary",
    difficulty: "beginner"
  },
  {
    id: "v_b_2",
    type: "multiple-choice",
    question: "I usually drink a cup of _____ in the morning.",
    options: { a: "bread", b: "coffee", c: "apple", d: "meat" },
    correctAnswer: "b",
    explanation: "Coffee is the only drink listed.",
    category: "vocabulary",
    difficulty: "beginner"
  },
  {
    id: "v_b_3",
    type: "multiple-choice",
    question: "We sleep in the _____.",
    options: { a: "kitchen", b: "bathroom", c: "bedroom", d: "garden" },
    correctAnswer: "c",
    explanation: "The bedroom is the room for sleeping.",
    category: "vocabulary",
    difficulty: "beginner"
  },
  {
    id: "v_b_4",
    type: "multiple-choice",
    question: "You wear _____ on your feet.",
    options: { a: "hats", b: "gloves", c: "shoes", d: "shirts" },
    correctAnswer: "c",
    explanation: "Shoes are worn on the feet.",
    category: "vocabulary",
    difficulty: "beginner"
  },
  {
    id: "v_b_5",
    type: "multiple-choice",
    question: "An elephant is a very _____ animal.",
    options: { a: "small", b: "tiny", c: "large", d: "thin" },
    correctAnswer: "c",
    explanation: "Elephants are known for their large size.",
    category: "vocabulary",
    difficulty: "beginner"
  },

  // VOCABULARY - INTERMEDIATE (26-35)
  {
    id: "v_i_1",
    type: "multiple-choice",
    question: "Choose the word that means 'to make something less severe':",
    options: { a: "mitigate", b: "aggravate", c: "precipitate", d: "exacerbate" },
    correctAnswer: "a",
    explanation: "'Mitigate' means to make less severe, harmful, or painful.",
    category: "vocabulary",
    difficulty: "intermediate"
  },
  {
    id: "v_i_2",
    type: "multiple-choice",
    question: "The company's profits have _____ by 15% this year.",
    options: { a: "increased", b: "raised", c: "risen", d: "heightened" },
    correctAnswer: "a",
    explanation: "'Increased' is the standard verb for rising profits in a transitive/intransitive context.",
    category: "vocabulary",
    difficulty: "intermediate"
  },
  {
    id: "v_i_3",
    type: "multiple-choice",
    question: "What's the _____ of your visit to our city?",
    options: { a: "purpose", b: "reason", c: "cause", d: "intention" },
    correctAnswer: "a",
    explanation: "'Purpose' is the most natural word for the goal of a visit.",
    category: "vocabulary",
    difficulty: "intermediate"
  },
  {
    id: "v_i_4",
    type: "multiple-choice",
    question: "The study was conducted with the _____ of determining the cause of the disease.",
    options: { a: "concept", b: "thought", c: "aim", d: "meaning" },
    correctAnswer: "c",
    explanation: "'Aim' indicates intention or purpose.",
    category: "vocabulary",
    difficulty: "intermediate"
  },
  {
    id: "v_i_5",
    type: "multiple-choice",
    question: "She _____ at him angrily before storming out of the room.",
    options: { a: "glanced", b: "stared", c: "glared", d: "peeked" },
    correctAnswer: "c",
    explanation: "'Glared' means to stare angrily.",
    category: "vocabulary",
    difficulty: "intermediate"
  },
  {
    id: "v_i_6",
    type: "multiple-choice",
    question: "He is very _____ and always thinks about others before himself.",
    options: { a: "selfish", b: "arrogant", c: "considerate", d: "stubborn" },
    correctAnswer: "c",
    explanation: "'Considerate' means showing careful thought for others.",
    category: "vocabulary",
    difficulty: "intermediate"
  },
  {
    id: "v_i_7",
    type: "multiple-choice",
    question: "The new software will _____ the process of data entry.",
    options: { a: "facilitate", b: "complicate", c: "hinder", d: "obstruct" },
    correctAnswer: "a",
    explanation: "'Facilitate' means to make a process easier.",
    category: "vocabulary",
    difficulty: "intermediate"
  },
  {
    id: "v_i_8",
    type: "multiple-choice",
    question: "Despite the bad weather, they decided to _____ with their plans.",
    options: { a: "proceed", b: "recede", c: "concede", d: "exceed" },
    correctAnswer: "a",
    explanation: "'Proceed' means to continue doing something.",
    category: "vocabulary",
    difficulty: "intermediate"
  },
  {
    id: "v_i_9",
    type: "multiple-choice",
    question: "I need to _____ my knowledge of history before the exam.",
    options: { a: "brush up on", b: "look down on", c: "put up with", d: "get away with" },
    correctAnswer: "a",
    explanation: "'Brush up on' means to improve your knowledge of something.",
    category: "vocabulary",
    difficulty: "intermediate"
  },
  {
    id: "v_i_10",
    type: "multiple-choice",
    question: "The meeting was _____ because the manager was ill.",
    options: { a: "put off", b: "called off", c: "taken off", d: "set off" },
    correctAnswer: "b",
    explanation: "'Called off' means canceled.",
    category: "vocabulary",
    difficulty: "intermediate"
  },

  // VOCABULARY - ADVANCED (36-40)
  {
    id: "v_a_1",
    type: "multiple-choice",
    question: "The antonym of 'benevolent' is:",
    options: { a: "kind", b: "charitable", c: "malevolent", d: "generous" },
    correctAnswer: "c",
    explanation: "'Malevolent' means having or showing a wish to do evil to others.",
    category: "vocabulary",
    difficulty: "advanced"
  },
  {
    id: "v_a_2",
    type: "multiple-choice",
    question: "A person who is 'loquacious' tends to be:",
    options: { a: "quiet", b: "talkative", c: "angry", d: "generous" },
    correctAnswer: "b",
    explanation: "'Loquacious' means tending to talk a great deal.",
    category: "vocabulary",
    difficulty: "advanced"
  },
  {
    id: "v_a_3",
    type: "multiple-choice",
    question: "His arguments were so _____ that everyone was convinced.",
    options: { a: "specious", b: "tenuous", c: "cogent", d: "frivolous" },
    correctAnswer: "c",
    explanation: "'Cogent' means clear, logical, and convincing.",
    category: "vocabulary",
    difficulty: "advanced"
  },
  {
    id: "v_a_4",
    type: "multiple-choice",
    question: "The manager's _____ attitude made it difficult for employees to express their opinions.",
    options: { a: "conciliatory", b: "dictatorial", c: "obsequious", d: "deferential" },
    correctAnswer: "b",
    explanation: "'Dictatorial' implies an oppressive, domineering attitude.",
    category: "vocabulary",
    difficulty: "advanced"
  },
  {
    id: "v_a_5",
    type: "multiple-choice",
    question: "The writer's style is characterized by a _____ use of metaphors.",
    options: { a: "prolific", b: "barren", c: "succinct", d: "terse" },
    correctAnswer: "a",
    explanation: "'Prolific' means present in large numbers or quantities.",
    category: "vocabulary",
    difficulty: "advanced"
  },

  // READING (41-45)
  {
    id: "r_1",
    type: "multiple-choice",
    question: "Read: 'The library will close early on Friday due to maintenance.' What happens on Friday?",
    options: { a: "The library is closed all day.", b: "The library opens late.", c: "The library closes earlier than usual.", d: "The library is being painted." },
    correctAnswer: "c",
    explanation: "The text explicitly states the library will 'close early'.",
    category: "reading",
    difficulty: "beginner"
  },
  {
    id: "r_2",
    type: "multiple-choice",
    question: "Read: 'Employees must submit their expense reports by the last day of the month to receive reimbursement in the next pay cycle.' When should reports be submitted to get paid soon?",
    options: { a: "First day of the month", b: "Anytime", c: "End of the month", d: "Next pay cycle" },
    correctAnswer: "c",
    explanation: "'The last day of the month' is synonymous with the end of the month.",
    category: "reading",
    difficulty: "intermediate"
  },
  {
    id: "r_3",
    type: "multiple-choice",
    question: "Read: 'Despite the team's initial apprehension regarding the new software deployment, the transition proved remarkably seamless.' What was the team's first feeling?",
    options: { a: "Excitement", b: "Anxiety", c: "Confidence", d: "Apathy" },
    correctAnswer: "b",
    explanation: "'Apprehension' is synonymous with anxiety or fear.",
    category: "reading",
    difficulty: "advanced"
  },
  {
    id: "r_4",
    type: "multiple-choice",
    question: "Read: 'Please ensure that all electrical devices are powered down before leaving the premises.' What should you do before leaving?",
    options: { a: "Turn on the lights", b: "Lock the doors", c: "Turn off devices", d: "Leave quickly" },
    correctAnswer: "c",
    explanation: "'Powered down' means to turn off.",
    category: "reading",
    difficulty: "beginner"
  },
  {
    id: "r_5",
    type: "multiple-choice",
    question: "Read: 'The CEO emphasized that while Q3 earnings fell short of projections, the long-term outlook remains robust.' What is the CEO's view of the future?",
    options: { a: "Pessimistic", b: "Uncertain", c: "Negative", d: "Positive" },
    correctAnswer: "d",
    explanation: "A 'robust' outlook implies strong and healthy future prospects.",
    category: "reading",
    difficulty: "intermediate"
  },

  // LISTENING (46-50)
  {
    id: "l_1",
    type: "multiple-choice",
    question: "What is the person doing?",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    transcript: "I'd like the steak, medium rare, please.",
    options: { a: "Cooking a meal", b: "Paying a bill", c: "Ordering food", d: "Complaining" },
    correctAnswer: "c",
    explanation: "The phrase 'I'd like...' followed by a food item is used to place an order.",
    category: "listening",
    difficulty: "beginner"
  },
  {
    id: "l_2",
    type: "multiple-choice",
    question: "Where should passengers go?",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    transcript: "Flight 302 to London is now boarding at Gate 15.",
    options: { a: "To London", b: "To Gate 15", c: "To the baggage claim", d: "To the ticket counter" },
    correctAnswer: "b",
    explanation: "The announcement explicitly states boarding is at Gate 15.",
    category: "listening",
    difficulty: "beginner"
  },
  {
    id: "l_3",
    type: "multiple-choice",
    question: "What is happening?",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    transcript: "Could you pass me the stapler? Thanks.",
    options: { a: "A meeting", b: "A presentation", c: "A simple request", d: "An argument" },
    correctAnswer: "c",
    explanation: "Asking someone to pass an item is a simple everyday request.",
    category: "listening",
    difficulty: "beginner"
  },
  {
    id: "l_4",
    type: "multiple-choice",
    question: "What will the weather be like at night?",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    transcript: "Expect heavy showers in the afternoon, clearing up by evening.",
    options: { a: "Raining heavily", b: "Snowing", c: "Clear", d: "Stormy" },
    correctAnswer: "c",
    explanation: "The forecast says it will be 'clearing up by evening', which implies clear weather at night.",
    category: "listening",
    difficulty: "intermediate"
  },
  {
    id: "l_5",
    type: "multiple-choice",
    question: "How many voted against it?",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    transcript: "The local council has unanimously voted to expand the public transit network.",
    options: { a: "Everyone", b: "No one", c: "Most people", d: "Some people" },
    correctAnswer: "b",
    explanation: "'Unanimously' means everyone voted in agreement, so no one voted against it.",
    category: "listening",
    difficulty: "advanced"
  }
];
