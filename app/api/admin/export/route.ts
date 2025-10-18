import { NextResponse } from 'next/server';
import { getQuestions } from '@/lib/csvHelper';

export const dynamic = 'force-dynamic';

// GET - Export questions as CSV
export async function GET() {
  try {
    const questions = await getQuestions();
    
    // Create CSV content
    let csv = 'Id,QuestionText,NoOfLikes\n';
    
    for (const q of questions) {
      // Escape quotes and commas in question text
      let escapedText = q.questionText.replace(/"/g, '""');
      if (escapedText.includes(',')) {
        escapedText = `"${escapedText}"`;
      }
      csv += `${q.id},${escapedText},${q.noOfLikes}\n`;
    }
    
    // Return as downloadable CSV file
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="questions.csv"',
      },
    });
  } catch (error) {
    console.error('Error exporting questions:', error);
    return NextResponse.json(
      { error: 'Failed to export questions' },
      { status: 500 }
    );
  }
}

