import { Question } from '@/types';

// In-memory storage for serverless environments (Vercel)
let questionsCache: Question[] = [];

export async function getQuestions(): Promise<Question[]> {
  return questionsCache;
}

export async function addQuestion(question: Question): Promise<void> {
  questionsCache.push(question);
}

export async function updateQuestion(updatedQuestion: Question): Promise<Question> {
  const index = questionsCache.findIndex(q => q.id === updatedQuestion.id);

  if (index === -1) {
    throw new Error('Question not found.');
  }

  questionsCache[index] = updatedQuestion;
  return updatedQuestion;
}

