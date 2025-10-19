import { Question } from '@/types';
import { kv } from '@vercel/kv';

// Redis key for storing questions
const QUESTIONS_KEY = 'questions';

export async function getQuestions(): Promise<Question[]> {
  try {
    const questions = await kv.get<Question[]>(QUESTIONS_KEY);
    return questions || [];
  } catch (error) {
    console.error('Error fetching questions from Redis:', error);
    return [];
  }
}

export async function addQuestion(question: Question): Promise<void> {
  try {
    const questions = await getQuestions();
    questions.push(question);
    await kv.set(QUESTIONS_KEY, questions);
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
    await kv.set(QUESTIONS_KEY, questions);
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
    await kv.set(QUESTIONS_KEY, filtered);
  } catch (error) {
    console.error('Error deleting question from Redis:', error);
    throw error;
  }
}

export async function replaceAllQuestions(questions: Question[]): Promise<void> {
  try {
    await kv.set(QUESTIONS_KEY, questions);
  } catch (error) {
    console.error('Error replacing questions in Redis:', error);
    throw error;
  }
}

