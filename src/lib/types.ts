export interface ChatDataTypes {
  id: number;
  userContent: string;
  aiContent: string;
  aiPendingResponse: boolean;
}

export interface chatTypes {
  role: string;
  parts: { text: string }[];
}
