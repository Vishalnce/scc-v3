export type QuizItem = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
};