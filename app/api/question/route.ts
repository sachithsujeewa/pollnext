import { NextRequest, NextResponse } from 'next/server';
import { getQuestions, addQuestion, updateQuestion } from '@/lib/csvHelper';
import { Question } from '@/types';

export const dynamic = 'force-dynamic';

// GET - Fetch all questions
export async function GET() {
  try {
    const questions = await getQuestions();
    return NextResponse.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}

// POST - Add a new question
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const question: Question = {
      id: crypto.randomUUID(),
      questionText: body.questionText,
      noOfLikes: 0,
    };

    await addQuestion(question);
    const questions = await getQuestions();
    
    return NextResponse.json(questions);
  } catch (error) {
    console.error('Error adding question:', error);
    return NextResponse.json(
      { error: 'Failed to add question' },
      { status: 500 }
    );
  }
}

// PUT - Update question (like/unlike)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    const questions = await getQuestions();
    const question = questions.find(q => q.id === body.id);

    if (!question) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    if (body.noOfLikes > 0) {
      question.noOfLikes++;
    } else {
      question.noOfLikes--;
    }

    await updateQuestion(question);
    const updatedQuestions = await getQuestions();
    
    // Sort by likes descending
    updatedQuestions.sort((a, b) => b.noOfLikes - a.noOfLikes);
    
    return NextResponse.json(updatedQuestions);
  } catch (error) {
    console.error('Error updating question:', error);
    return NextResponse.json(
      { error: 'Failed to update question' },
      { status: 500 }
    );
  }
}

