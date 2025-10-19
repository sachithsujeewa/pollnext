import { Member } from '@/types';
import Redis from 'ioredis';

// Redis key for storing members
const MEMBERS_KEY = 'members';

// Initialize Redis client
const redis = new Redis(process.env.REDIS_URL || '');

export async function addMember(member: Member): Promise<void> {
  try {
    const members = await getMembers();
    // Auto-increment ID
    const maxId = members.length > 0 ? Math.max(...members.map(m => m.id)) : 0;
    member.id = maxId + 1;
    members.push(member);
    await redis.set(MEMBERS_KEY, JSON.stringify(members));
  } catch (error) {
    console.error('Error adding member to Redis:', error);
    throw error;
  }
}

export async function getMembers(): Promise<Member[]> {
  try {
    const data = await redis.get(MEMBERS_KEY);
    if (!data) return [];
    const members = JSON.parse(data);
    return Array.isArray(members) ? members : [];
  } catch (error) {
    console.error('Error fetching members from Redis:', error);
    return [];
  }
}

