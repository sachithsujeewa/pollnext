import { NextRequest, NextResponse } from 'next/server';
import { Question } from '@/types';
import * as csvHelper from '@/lib/csvHelper';

export const dynamic = 'force-dynamic';

// Helper to replace all questions
async function replaceAllQuestions(questions: Question[]) {
  // Clear existing and add new ones
  (csvHelper as any).questionsCache = questions;
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

// POST - Import questions from CSV
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const text = await file.text();
    const lines = text.split('\n');
    
    const questions: Question[] = [];
    
    // Skip header (first line)
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      
      const parts = parseCsvLine(line);
      if (parts.length >= 3) {
        const likes = parseInt(parts[2], 10);
        questions.push({
          id: parts[0],
          questionText: parts[1],
          noOfLikes: isNaN(likes) ? 0 : likes,
        });
      }
    }

    await replaceAllQuestions(questions);
    
    return NextResponse.json({ 
      success: true, 
      imported: questions.length 
    });
  } catch (error) {
    console.error('Error importing questions:', error);
    return NextResponse.json(
      { error: 'Failed to import questions' },
      { status: 500 }
    );
  }
}

