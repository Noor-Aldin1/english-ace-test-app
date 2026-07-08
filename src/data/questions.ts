export type QuestionCategory = 'grammar' | 'vocabulary' | 'reading' | 'listening';

export interface Question {
  id: string;
  text: string;
  options: {
    [key: string]: string;
  };
  correctOption: string;
  category: QuestionCategory;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export const questionsBank: Question[] = [
  // GRAMMAR - BEGINNER (1-5)
  {
    id: "g_b_1",
    text: "She _____ to the store yesterday.",
    options: { a: "go", b: "goes", c: "went", d: "gone" },
    correctOption: "c",
    category: "grammar",
    difficulty: "beginner"
  },
  {
    id: "g_b_2",
    text: "I _____ a student.",
    options: { a: "am", b: "is", c: "are", d: "be" },
    correctOption: "a",
    category: "grammar",
    difficulty: "beginner"
  },
  {
    id: "g_b_3",
    text: "They _____ playing football right now.",
    options: { a: "is", b: "are", c: "was", d: "were" },
    correctOption: "b",
    category: "grammar",
    difficulty: "beginner"
  },
  {
    id: "g_b_4",
    text: "He doesn't _____ any brothers.",
    options: { a: "has", b: "having", c: "had", d: "have" },
    correctOption: "d",
    category: "grammar",
    difficulty: "beginner"
  },
  {
    id: "g_b_5",
    text: "We _____ to Paris last year.",
    options: { a: "travel", b: "travelled", c: "traveling", d: "travels" },
    correctOption: "b",
    category: "grammar",
    difficulty: "beginner"
  },

  // GRAMMAR - INTERMEDIATE (6-15)
  {
    id: "g_i_1",
    text: "If I _____ rich, I would travel the world.",
    options: { a: "am", b: "were", c: "was", d: "be" },
    correctOption: "b",
    category: "grammar",
    difficulty: "intermediate"
  },
  {
    id: "g_i_2",
    text: "By the time I _____ home, they had already left.",
    options: { a: "get", b: "got", c: "have gotten", d: "had gotten" },
    correctOption: "b",
    category: "grammar",
    difficulty: "intermediate"
  },
  {
    id: "g_i_3",
    text: "We can't leave until the work _____.",
    options: { a: "will finish", b: "is finishing", c: "is finished", d: "finishes" },
    correctOption: "c",
    category: "grammar",
    difficulty: "intermediate"
  },
  {
    id: "g_i_4",
    text: "Neither John nor his sisters _____ going to the party.",
    options: { a: "is", b: "are", c: "was", d: "were" },
    correctOption: "b",
    category: "grammar",
    difficulty: "intermediate"
  },
  {
    id: "g_i_5",
    text: "She's the woman _____ son won the competition.",
    options: { a: "who", b: "whom", c: "whose", d: "which" },
    correctOption: "c",
    category: "grammar",
    difficulty: "intermediate"
  },
  {
    id: "g_i_6",
    text: "The project was completed _____ schedule.",
    options: { a: "in", b: "on", c: "at", d: "by" },
    correctOption: "b",
    category: "grammar",
    difficulty: "intermediate"
  },
  {
    id: "g_i_7",
    text: "She spoke so _____ that I couldn't understand her.",
    options: { a: "quickly", b: "fastly", c: "rapid", d: "speed" },
    correctOption: "a",
    category: "grammar",
    difficulty: "intermediate"
  },
  {
    id: "g_i_8",
    text: "I'd rather you _____ tell anyone about this.",
    options: { a: "don't", b: "won't", c: "didn't", d: "wouldn't" },
    correctOption: "c",
    category: "grammar",
    difficulty: "intermediate"
  },
  {
    id: "g_i_9",
    text: "You _____ have left your keys in the car.",
    options: { a: "should", b: "might", c: "can", d: "ought" },
    correctOption: "b",
    category: "grammar",
    difficulty: "intermediate"
  },
  {
    id: "g_i_10",
    text: "Hardly had I arrived _____ it started to rain.",
    options: { a: "than", b: "when", c: "then", d: "after" },
    correctOption: "b",
    category: "grammar",
    difficulty: "intermediate"
  },

  // GRAMMAR - ADVANCED (16-20)
  {
    id: "g_a_1",
    text: "Not only _____ late, but she also forgot her presentation.",
    options: { a: "did she arrive", b: "she arrived", c: "arrived she", d: "she did arrive" },
    correctOption: "a",
    category: "grammar",
    difficulty: "advanced"
  },
  {
    id: "g_a_2",
    text: "Had I known about the traffic, I _____ earlier.",
    options: { a: "will leave", b: "would leave", c: "would have left", d: "had left" },
    correctOption: "c",
    category: "grammar",
    difficulty: "advanced"
  },
  {
    id: "g_a_3",
    text: "It is imperative that he _____ present at the meeting.",
    options: { a: "is", b: "be", c: "was", d: "will be" },
    correctOption: "b",
    category: "grammar",
    difficulty: "advanced"
  },
  {
    id: "g_a_4",
    text: "No sooner had we sat down _____ the phone rang.",
    options: { a: "when", b: "than", c: "then", d: "that" },
    correctOption: "b",
    category: "grammar",
    difficulty: "advanced"
  },
  {
    id: "g_a_5",
    text: "He was accused _____ stealing the money.",
    options: { a: "for", b: "of", c: "about", d: "with" },
    correctOption: "b",
    category: "grammar",
    difficulty: "advanced"
  },

  // VOCABULARY - BEGINNER (21-25)
  {
    id: "v_b_1",
    text: "My brother is my father's _____.",
    options: { a: "daughter", b: "son", c: "uncle", d: "nephew" },
    correctOption: "b",
    category: "vocabulary",
    difficulty: "beginner"
  },
  {
    id: "v_b_2",
    text: "I usually drink a cup of _____ in the morning.",
    options: { a: "bread", b: "coffee", c: "apple", d: "meat" },
    correctOption: "b",
    category: "vocabulary",
    difficulty: "beginner"
  },
  {
    id: "v_b_3",
    text: "We sleep in the _____.",
    options: { a: "kitchen", b: "bathroom", c: "bedroom", d: "garden" },
    correctOption: "c",
    category: "vocabulary",
    difficulty: "beginner"
  },
  {
    id: "v_b_4",
    text: "You wear _____ on your feet.",
    options: { a: "hats", b: "gloves", c: "shoes", d: "shirts" },
    correctOption: "c",
    category: "vocabulary",
    difficulty: "beginner"
  },
  {
    id: "v_b_5",
    text: "An elephant is a very _____ animal.",
    options: { a: "small", b: "tiny", c: "large", d: "thin" },
    correctOption: "c",
    category: "vocabulary",
    difficulty: "beginner"
  },

  // VOCABULARY - INTERMEDIATE (26-35)
  {
    id: "v_i_1",
    text: "Choose the word that means 'to make something less severe':",
    options: { a: "mitigate", b: "aggravate", c: "precipitate", d: "exacerbate" },
    correctOption: "a",
    category: "vocabulary",
    difficulty: "intermediate"
  },
  {
    id: "v_i_2",
    text: "The company's profits have _____ by 15% this year.",
    options: { a: "increased", b: "raised", c: "risen", d: "heightened" },
    correctOption: "a",
    category: "vocabulary",
    difficulty: "intermediate"
  },
  {
    id: "v_i_3",
    text: "What's the _____ of your visit to our city?",
    options: { a: "purpose", b: "reason", c: "cause", d: "intention" },
    correctOption: "a",
    category: "vocabulary",
    difficulty: "intermediate"
  },
  {
    id: "v_i_4",
    text: "The study was conducted with the _____ of determining the cause of the disease.",
    options: { a: "concept", b: "thought", c: "aim", d: "meaning" },
    correctOption: "c",
    category: "vocabulary",
    difficulty: "intermediate"
  },
  {
    id: "v_i_5",
    text: "She _____ at him angrily before storming out of the room.",
    options: { a: "glanced", b: "stared", c: "glared", d: "peeked" },
    correctOption: "c",
    category: "vocabulary",
    difficulty: "intermediate"
  },
  {
    id: "v_i_6",
    text: "He is very _____ and always thinks about others before himself.",
    options: { a: "selfish", b: "arrogant", c: "considerate", d: "stubborn" },
    correctOption: "c",
    category: "vocabulary",
    difficulty: "intermediate"
  },
  {
    id: "v_i_7",
    text: "The new software will _____ the process of data entry.",
    options: { a: "facilitate", b: "complicate", c: "hinder", d: "obstruct" },
    correctOption: "a",
    category: "vocabulary",
    difficulty: "intermediate"
  },
  {
    id: "v_i_8",
    text: "Despite the bad weather, they decided to _____ with their plans.",
    options: { a: "proceed", b: "recede", c: "concede", d: "exceed" },
    correctOption: "a",
    category: "vocabulary",
    difficulty: "intermediate"
  },
  {
    id: "v_i_9",
    text: "I need to _____ my knowledge of history before the exam.",
    options: { a: "brush up on", b: "look down on", c: "put up with", d: "get away with" },
    correctOption: "a",
    category: "vocabulary",
    difficulty: "intermediate"
  },
  {
    id: "v_i_10",
    text: "The meeting was _____ because the manager was ill.",
    options: { a: "put off", b: "called off", c: "taken off", d: "set off" },
    correctOption: "b",
    category: "vocabulary",
    difficulty: "intermediate"
  },

  // VOCABULARY - ADVANCED (36-40)
  {
    id: "v_a_1",
    text: "The antonym of 'benevolent' is:",
    options: { a: "kind", b: "charitable", c: "malevolent", d: "generous" },
    correctOption: "c",
    category: "vocabulary",
    difficulty: "advanced"
  },
  {
    id: "v_a_2",
    text: "A person who is 'loquacious' tends to be:",
    options: { a: "quiet", b: "talkative", c: "angry", d: "generous" },
    correctOption: "b",
    category: "vocabulary",
    difficulty: "advanced"
  },
  {
    id: "v_a_3",
    text: "His arguments were so _____ that everyone was convinced.",
    options: { a: "specious", b: "tenuous", c: "cogent", d: "frivolous" },
    correctOption: "c",
    category: "vocabulary",
    difficulty: "advanced"
  },
  {
    id: "v_a_4",
    text: "The manager's _____ attitude made it difficult for employees to express their opinions.",
    options: { a: "conciliatory", b: "dictatorial", c: "obsequious", d: "deferential" },
    correctOption: "b",
    category: "vocabulary",
    difficulty: "advanced"
  },
  {
    id: "v_a_5",
    text: "The writer's style is characterized by a _____ use of metaphors.",
    options: { a: "prolific", b: "barren", c: "succinct", d: "terse" },
    correctOption: "a",
    category: "vocabulary",
    difficulty: "advanced"
  },

  // READING (41-45)
  {
    id: "r_1",
    text: "Read: 'The library will close early on Friday due to maintenance.' What happens on Friday?",
    options: { a: "The library is closed all day.", b: "The library opens late.", c: "The library closes earlier than usual.", d: "The library is being painted." },
    correctOption: "c",
    category: "reading",
    difficulty: "beginner"
  },
  {
    id: "r_2",
    text: "Read: 'Employees must submit their expense reports by the last day of the month to receive reimbursement in the next pay cycle.' When should reports be submitted to get paid soon?",
    options: { a: "First day of the month", b: "Anytime", c: "End of the month", d: "Next pay cycle" },
    correctOption: "c",
    category: "reading",
    difficulty: "intermediate"
  },
  {
    id: "r_3",
    text: "Read: 'Despite the team's initial apprehension regarding the new software deployment, the transition proved remarkably seamless.' What was the team's first feeling?",
    options: { a: "Excitement", b: "Anxiety", c: "Confidence", d: "Apathy" },
    correctOption: "b",
    category: "reading",
    difficulty: "advanced"
  },
  {
    id: "r_4",
    text: "Read: 'Please ensure that all electrical devices are powered down before leaving the premises.' What should you do before leaving?",
    options: { a: "Turn on the lights", b: "Lock the doors", c: "Turn off devices", d: "Leave quickly" },
    correctOption: "c",
    category: "reading",
    difficulty: "beginner"
  },
  {
    id: "r_5",
    text: "Read: 'The CEO emphasized that while Q3 earnings fell short of projections, the long-term outlook remains robust.' What is the CEO's view of the future?",
    options: { a: "Pessimistic", b: "Uncertain", c: "Negative", d: "Positive" },
    correctOption: "d",
    category: "reading",
    difficulty: "intermediate"
  },

  // LISTENING / COMPREHENSION (46-50) (Mocked as text for now)
  {
    id: "l_1",
    text: "Context: In a restaurant. 'I'd like the steak, medium rare, please.' What is the person doing?",
    options: { a: "Cooking a meal", b: "Paying a bill", c: "Ordering food", d: "Complaining" },
    correctOption: "c",
    category: "listening",
    difficulty: "beginner"
  },
  {
    id: "l_2",
    text: "Context: Airport announcement. 'Flight 302 to London is now boarding at Gate 15.' Where should passengers go?",
    options: { a: "To London", b: "To Gate 15", c: "To the baggage claim", d: "To the ticket counter" },
    correctOption: "b",
    category: "listening",
    difficulty: "beginner"
  },
  {
    id: "l_3",
    text: "Context: Office conversation. 'Could you pass me the stapler? Thanks.' What is happening?",
    options: { a: "A meeting", b: "A presentation", c: "A simple request", d: "An argument" },
    correctOption: "c",
    category: "listening",
    difficulty: "beginner"
  },
  {
    id: "l_4",
    text: "Context: Weather forecast. 'Expect heavy showers in the afternoon, clearing up by evening.' What will the weather be like at night?",
    options: { a: "Raining heavily", b: "Snowing", c: "Clear", d: "Stormy" },
    correctOption: "c",
    category: "listening",
    difficulty: "intermediate"
  },
  {
    id: "l_5",
    text: "Context: News report. 'The local council has unanimously voted to expand the public transit network.' How many voted against it?",
    options: { a: "Everyone", b: "No one", c: "Most people", d: "Some people" },
    correctOption: "b",
    category: "listening",
    difficulty: "advanced"
  }
];
