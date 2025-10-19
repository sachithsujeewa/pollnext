import { Question } from '@/types';
import Redis from 'ioredis';

// Redis key for storing questions
const QUESTIONS_KEY = 'questions';

// Initialize Redis client
const redis = new Redis(process.env.REDIS_URL || '');

export async function getQuestions(): Promise<Question[]> {
  try {
    const data = await redis.get(QUESTIONS_KEY);
    if (!data) return [];
    const questions = JSON.parse(data);
    return Array.isArray(questions) ? questions : [];
  } catch (error) {
    console.error('Error fetching questions from Redis:', error);
    return [];
  }
}

export async function addQuestion(question: Question): Promise<void> {
  try {
    const questions = await getQuestions();
    questions.push(question);
    await redis.set(QUESTIONS_KEY, JSON.stringify(questions));
  } catch (error) {
    console.error('Error adding question to Redis:', error);
    throw error;
  }
}

export async function updateQuestion(updatedQuestion: Question): Promise<Question> {
  try {
    const questions = await getQuestions();
    const index = questions.findIndex(q => q.id === updatedQuestion.id);

    if (index === -1) {
      throw new Error('Question not found.');
    }

    questions[index] = updatedQuestion;
    await redis.set(QUESTIONS_KEY, JSON.stringify(questions));
    return updatedQuestion;
  } catch (error) {
    console.error('Error updating question in Redis:', error);
    throw error;
  }
}

export async function deleteQuestion(id: string): Promise<void> {
  try {
    const questions = await getQuestions();
    const filtered = questions.filter(q => q.id !== id);
    await redis.set(QUESTIONS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting question from Redis:', error);
    throw error;
  }
}

export async function replaceAllQuestions(questions: Question[]): Promise<void> {
  try {
    await redis.set(QUESTIONS_KEY, JSON.stringify(questions));
  } catch (error) {
    console.error('Error replacing questions in Redis:', error);
    throw error;
  }
}

