import { Member } from '@/types';
import { kv } from '@vercel/kv';

// Redis key for storing members
const MEMBERS_KEY = 'members';

export async function addMember(member: Member): Promise<void> {
  try {
    const members = await getMembers();
    // Auto-increment ID
    const maxId = members.length > 0 ? Math.max(...members.map(m => m.id)) : 0;
    member.id = maxId + 1;
    members.push(member);
    await kv.set(MEMBERS_KEY, members);
  } catch (error) {
    console.error('Error adding member to Redis:', error);
    throw error;
  }
}

export async function getMembers(): Promise<Member[]> {
  try {
    const members = await kv.get<Member[]>(MEMBERS_KEY);
    return members || [];
  } catch (error) {
    console.error('Error fetching members from Redis:', error);
    return [];
  }
}

