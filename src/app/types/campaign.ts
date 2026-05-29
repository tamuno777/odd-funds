export type Campaign = {
  id: string;
  title: string;
  description: string;
  image?: string | null;
  goal: number;
  raised: number;
  donors?: number;
  status: string;
  createdAt: string;
};