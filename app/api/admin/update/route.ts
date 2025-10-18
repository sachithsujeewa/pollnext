import { NextRequest, NextResponse } from 'next/server';
import { updateQuestion, getQuestions } from '@/lib/csvHelper';

export const dynamic = 'force-dynamic';

// PUT - Update question text
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, questionText } = body;
    
    if (!id || !questionText) {
      return NextResponse.json(
        { error: 'Missing id or questionText' },
        { status: 400 }
      );
    }

    const questions = await getQuestions();
    const question = questions.find(q => q.id === id);

    if (!question) {
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    question.questionText = questionText;
    await updateQuestion(question);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating question:', error);
    return NextResponse.json(
      { error: 'Failed to update question' },
      { status: 500 }
    );
  }
}

