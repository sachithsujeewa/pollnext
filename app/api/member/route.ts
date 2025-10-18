import { NextRequest, NextResponse } from 'next/server';
import { addMember } from '@/lib/memberHelper';
import { Member } from '@/types';

export const dynamic = 'force-dynamic';

// POST - Add a new member
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const member: Member = {
      id: 0, // Will be auto-generated
      name: body.name,
      mobile: body.mobile,
    };

    await addMember(member);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding member:', error);
    return NextResponse.json(
      { error: 'Failed to add member' },
      { status: 500 }
    );
  }
}

