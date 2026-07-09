export type UserRole = 'photographer' | 'client';

export type Photo = {
  id: number;
  title: string;
  src: string;
  alt: string;
};

export type Album = {
  id: number;
  title: string;
  clientName: string;
  driveLink: string;
  status: 'Draft' | 'Published';
  cover: string;
  photos: Photo[];
};

export type User = {
  id: number;
  name: string;
  role: UserRole;
  email: string;
  clientName?: string;
};

export type AgentMessage = {
  id: number;
  role: 'assistant' | 'user';
  text: string;
};
