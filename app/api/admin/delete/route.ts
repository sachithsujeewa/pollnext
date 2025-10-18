import { NextRequest, NextResponse } from 'next/server';
import * as csvHelper from '@/lib/csvHelper';

export const dynamic = 'force-dynamic';

// Helper to delete a question
async function deleteQuestionById(id: string) {
  const questions = await csvHelper.getQuestions();
  const filtered = questions.filter(q => q.id !== id);
  (csvHelper as any).questionsCache = filtered;
}

// DELETE - Remove a question
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing id' },
        { status: 400 }
      );
    }

    await deleteQuestionById(id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting question:', error);
    return NextResponse.json(
      { error: 'Failed to delete question' },
      { status: 500 }
    );
  }
}

