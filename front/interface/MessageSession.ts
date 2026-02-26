export type MessageType = "user" | "coach" | "bot" | "system";




export interface MessageSessionProps {
  id: string;
  conversationId: string;
  content: string;
  type: MessageType;
  senderId: string | null;
  createdAt: string;
  isRead: boolean;
  messages: MessageSessionProps[];
}
