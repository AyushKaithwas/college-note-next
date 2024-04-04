export interface Note {
  id: number;
  userId: string; // this is mapped to "User_id" in your Prisma schema, but in TypeScript, we use the field name as it appears in the Prisma client API
  title: string;
  desc: string | null;
  notesLink: string;
  downloads: number;
  thumbnail: string | null;
  noteSize: number;
  subject: string;
  institution: string;
  fieldOfStudy: string;
  semester: string | null;
  time: Date;
  noOfUpvotes: number;
}

export interface UserWithNotes {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  numberOfNotes: number;
  image: string | null;
  hashedPassword: string | null;
  accountCreationTime: Date;
  notes: Note[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  numberOfNotes: number;
  image: string | null;
  hashedPassword: string | null;
  accountCreationTime: Date;
}

export interface FileDetailsType {
  url: string;
  size: number;
  uploadedAt: Date;
  metadata: Record<string, never>;
  path: Record<string, never>;
  pathOrder: string[];
}

export interface Payload {
  title: string;
  description: string;
  institution: string;
  fieldOfStudy: string;
  semester: string;
  subject: string;
  size: number;
  url: string;
  userEmail: string;
}

export interface ApiResponse {
  url: string;
}
