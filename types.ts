export interface Project {
  id: number;
  title: string;
  category: 'Paisagismo' | 'Reflorestamento' | 'Consultoria';
  description: string;
  imageUrl: string;
  tags: string[];
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
  category: 'Técnica' | 'Software' | 'Gestão';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}