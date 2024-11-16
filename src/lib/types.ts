export interface Message {
    position: 'left' | 'right';
    type: 'text';
    title: string;
    text: string;
    date: Date;
    avatar: string;
}
  
export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
 }
  
export interface TransactionStep {
    action: string;
    amount: string;
    from_token: string;
    from_chain: string;
    to_token: string;
    to_chain: string;
}