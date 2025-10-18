import fs from 'fs';
import path from 'path';
import { Question } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const QUESTIONS_FILE = path.join(DATA_DIR, 'questions.csv');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// File lock simulation using a simple flag
let isLocked = false;

async function acquireLock(): Promise<void> {
  while (isLocked) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  isLocked = true;
}

function releaseLock(): void {
  isLocked = false;
}

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let inQuotes = false;
  let current = '';

  for (const c of line) {
    if (c === '"' && inQuotes) {
      inQuotes = false;
    } else if (c === '"' && !inQuotes) {
      inQuotes = true;
    } else if (c === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += c;
    }
  }

  result.push(current);
  return result;
}

function escapeText(text: string): string {
  let escaped = text.replace(/"/g, '""');
  if (escaped.includes(',')) {
    escaped = `"${escaped}"`;
  }
  return escaped;
}

export async function getQuestions(): Promise<Question[]> {
  await acquireLock();
  try {
    const questions: Question[] = [];

    if (!fs.existsSync(QUESTIONS_FILE)) {
      return questions;
    }

    const content = fs.readFileSync(QUESTIONS_FILE, 'utf-8');
    const lines = content.split('\n').slice(1); // Skip header

    for (const line of lines) {
      if (!line.trim()) continue;
      
      const parts = parseCsvLine(line);
      if (parts.length === 3) {
        const likes = parseInt(parts[2], 10);
        if (!isNaN(likes)) {
          questions.push({
            id: parts[0],
            questionText: parts[1],
            noOfLikes: likes,
          });
        }
      }
    }

    return questions;
  } finally {
    releaseLock();
  }
}

export async function addQuestion(question: Question): Promise<void> {
  await acquireLock();
  try {
    const fileExists = fs.existsSync(QUESTIONS_FILE);
    
    let content = '';
    if (!fileExists) {
      content = 'Id,QuestionText,NoOfLikes\n';
    }

    const escapedText = escapeText(question.questionText);
    content += `${question.id},${escapedText},${question.noOfLikes}\n`;

    fs.appendFileSync(QUESTIONS_FILE, content);
  } finally {
    releaseLock();
  }
}

export async function updateQuestion(updatedQuestion: Question): Promise<Question> {
  await acquireLock();
  try {
    const questions = await getQuestions();
    const index = questions.findIndex(q => q.id === updatedQuestion.id);

    if (index === -1) {
      throw new Error('Question not found.');
    }

    questions[index] = updatedQuestion;

    let content = 'Id,QuestionText,NoOfLikes\n';
    for (const q of questions) {
      const escapedText = escapeText(q.questionText);
      content += `${q.id},${escapedText},${q.noOfLikes}\n`;
    }

    fs.writeFileSync(QUESTIONS_FILE, content);

    return updatedQuestion;
  } finally {
    releaseLock();
  }
}

