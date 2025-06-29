
export enum MessageRole {
  USER = 'user',
  BOT = 'bot',
}

export interface Source {
  uri: string;
  title: string;
}

export interface Message {
  id: string;
  role: MessageRole;
  text: string;
  sources?: Source[];
}
