export interface Message {
  id: string;
  timestamp: Date;
  sender: string;
  content: string;
  isUser: boolean;
}

export interface ConversationData {
  messages: Message[];
  participants: string[];
  dateRange: {
    start: Date;
    end: Date;
  };
}

export interface AnalysisResult {
  overview: {
    totalMessages: number;
    participantCount: number;
    averageResponseTime: number;
    mostActiveDay: string;
  };
  sentimentAnalysis: {
    positive: number;
    negative: number;
    neutral: number;
  };
  topTopics: Array<{
    topic: string;
    frequency: number;
  }>;
  communicationStyle: {
    userStyle: string;
    participantStyles: Array<{
      name: string;
      style: string;
      tone: string;
    }>;
  };
  timePatterns: Array<{
    hour: number;
    messageCount: number;
  }>;
  wordCloud: Array<{
    word: string;
    frequency: number;
  }>;
  responseTimeData: Array<{
    date: string;
    averageTime: number;
  }>;
}

export type AnalysisStep = 'upload' | 'processing' | 'results';