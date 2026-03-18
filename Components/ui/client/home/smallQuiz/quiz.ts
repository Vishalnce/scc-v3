export interface QuizItem {
  question: string;
  subject: string;
  options: string[];
  answer: string;
}

export interface QuizAPI {
  questionText: string;
  subject: string;
  options: { text: string }[];
  correctOption: number;
}