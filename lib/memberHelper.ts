import { Member } from '@/types';

// In-memory storage for serverless environments (Vercel)
let membersCache: Member[] = [];

export async function addMember(member: Member): Promise<void> {
  // Auto-increment ID
  const maxId = membersCache.length > 0 ? Math.max(...membersCache.map(m => m.id)) : 0;
  member.id = maxId + 1;
  membersCache.push(member);
}

export async function getMembers(): Promise<Member[]> {
  return membersCache;
}

