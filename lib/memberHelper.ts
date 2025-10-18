import fs from 'fs';
import path from 'path';
import { Member } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const MEMBERS_FILE = path.join(DATA_DIR, 'members.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export async function addMember(member: Member): Promise<void> {
  let members: Member[] = [];
  
  if (fs.existsSync(MEMBERS_FILE)) {
    const content = fs.readFileSync(MEMBERS_FILE, 'utf-8');
    members = JSON.parse(content);
  }

  // Auto-increment ID
  const maxId = members.length > 0 ? Math.max(...members.map(m => m.id)) : 0;
  member.id = maxId + 1;

  members.push(member);
  fs.writeFileSync(MEMBERS_FILE, JSON.stringify(members, null, 2));
}

export async function getMembers(): Promise<Member[]> {
  if (!fs.existsSync(MEMBERS_FILE)) {
    return [];
  }

  const content = fs.readFileSync(MEMBERS_FILE, 'utf-8');
  return JSON.parse(content);
}

