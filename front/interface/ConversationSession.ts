export interface ConversationSession {
  id: string;

  user: {
    id: string;
    name: string;
    email: string;
  };

  coach: {
    id: string;
    name: string;
    email: string;
  };

  createdAt?: string;
}