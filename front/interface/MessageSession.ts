export type MessageType = "user" | "coach" | "bot" | "system";




export interface MessageSessionProps {
  id: string;
  conversationId: string;
  content: string;
  type: MessageType;
  senderId: string | null;
  sender:{
    id: string;
    name: string;
    email: string;
  }
  createdAt: string;
  isRead: boolean;

}
