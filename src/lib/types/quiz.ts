// src/lib/types/quiz.ts

export type QuizType = "THEORY" | "ARCHITECT" | "DEFAULT";

export type Option = {
  content: string;
  correct: boolean;
};

export type Question = {
  id: string;
  prompt: string;
  options: Option[];
  hint: string;
  topic?: string;
};

export type Quiz = {
  type: QuizType;
  topic: string;
  questions: Question[];
};

export type QuizData = {
  url: string;
  quiz: Quiz;
};

export type Category = {
  id: string;
  name: string;
  questionCount: number;
  types: QuizType[];
};

export type QuizConfig = {
  category: string;
  type: QuizType | "RANDOM";
  questionCount: 10 | 35 | 50;
};

export type QuizState = {
  questions: Question[];
  currentIndex: number;
  score: number;
  answers: Map<string, { selectedIndex: number; correct: boolean }>;
  isComplete: boolean;
};
