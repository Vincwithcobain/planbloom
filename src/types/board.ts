
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Card {
  id: string;
  title: string;
  description?: string;
  assignedUsers?: User[];
  createdBy: string;
  createdAt: string;
}

export interface Column {
  id: string;
  title: string;
  cards: Card[];
  createdBy: string;
}

export interface Board {
  id: string;
  title: string;
  columns: Column[];
  users: User[];
  createdBy: string;
  createdAt: string;
}
