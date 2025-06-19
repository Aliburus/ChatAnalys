import type { ConversationData, AnalysisResult } from "../types";

const sentimentWords = {
  positive: [
    "happy",
    "love",
    "great",
    "awesome",
    "good",
    "nice",
    "thanks",
    "perfect",
    "amazing",
    "wonderful",
  ],
  negative: [
    "sad",
    "hate",
    "bad",
    "awful",
    "terrible",
    "angry",
    "disappointed",
    "frustrated",
    "upset",
    "annoying",
  ],
};

const commonTopics = [
  "work",
  "family",
  "friends",
  "travel",
  "food",
  "movies",
  "music",
  "sports",
  "weather",
  "health",
  "plans",
  "shopping",
  "technology",
  "news",
  "games",
];

export const analyzeConversation = async (
  data: ConversationData
): Promise<AnalysisResult> => {
  // Simulate AI processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const { messages, participants } = data;
  const userMessages = messages.filter((m) => m.isUser);
  const otherMessages = messages.filter((m) => !m.isUser);

  // Calculate sentiment
  const sentiment = calculateSentiment(messages);

  // Extract topics
  const topics = extractTopics(messages);

  // Analyze communication styles
  const communicationStyle = analyzeCommunicationStyle(
    userMessages,
    otherMessages,
    participants
  );

  // Calculate time patterns
  const timePatterns = calculateTimePatterns(messages);

  // Generate word cloud data
  const wordCloud = generateWordCloud(messages);

  // Calculate response times
  const responseTimeData = calculateResponseTimes(messages);

  return {
    overview: {
      totalMessages: messages.length,
      participantCount: participants.length,
      averageResponseTime: calculateAverageResponseTime(messages),
      mostActiveDay: getMostActiveDay(messages),
    },
    sentimentAnalysis: sentiment,
    topTopics: topics,
    communicationStyle,
    timePatterns,
    wordCloud,
    responseTimeData,
  };
};

const calculateSentiment = (messages: any[]) => {
  let positive = 0,
    negative = 0,
    neutral = 0;

  messages.forEach((message) => {
    const content = message.content.toLowerCase();
    const hasPositive = sentimentWords.positive.some((word) =>
      content.includes(word)
    );
    const hasNegative = sentimentWords.negative.some((word) =>
      content.includes(word)
    );

    if (hasPositive && !hasNegative) positive++;
    else if (hasNegative && !hasPositive) negative++;
    else neutral++;
  });

  const total = messages.length;
  return {
    positive: Math.round((positive / total) * 100),
    negative: Math.round((negative / total) * 100),
    neutral: Math.round((neutral / total) * 100),
  };
};

const extractTopics = (messages: any[]) => {
  const topicCounts: { [key: string]: number } = {};

  messages.forEach((message) => {
    const content = message.content.toLowerCase();
    commonTopics.forEach((topic) => {
      if (content.includes(topic)) {
        topicCounts[topic] = (topicCounts[topic] || 0) + 1;
      }
    });
  });

  return Object.entries(topicCounts)
    .map(([topic, frequency]) => ({ topic, frequency }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 8);
};

const analyzeCommunicationStyle = (
  _userMessages: any[],
  _otherMessages: any[],
  participants: string[]
) => {
  const styles = ["Direct", "Casual", "Formal", "Emotional", "Analytical"];
  const tones = [
    "Friendly",
    "Professional",
    "Enthusiastic",
    "Reserved",
    "Supportive",
  ];

  return {
    userStyle: styles[Math.floor(Math.random() * styles.length)],
    participantStyles: participants
      .filter((p) => p.toLowerCase() !== "you" && p.toLowerCase() !== "sen")
      .slice(0, 5)
      .map((name) => ({
        name,
        style: styles[Math.floor(Math.random() * styles.length)],
        tone: tones[Math.floor(Math.random() * tones.length)],
      })),
  };
};

const calculateTimePatterns = (messages: any[]) => {
  const hourCounts = Array(24).fill(0);

  messages.forEach((message) => {
    const hour = message.timestamp.getHours();
    hourCounts[hour]++;
  });

  return hourCounts.map((count, hour) => ({ hour, messageCount: count }));
};

const generateWordCloud = (messages: any[]) => {
  const words: { [key: string]: number } = {};

  messages.forEach((message) => {
    const content = message.content
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter((word: string | any[]) => word.length > 3);

    content.forEach((word: string | number) => {
      words[word] = (words[word] || 0) + 1;
    });
  });

  return Object.entries(words)
    .map(([word, frequency]) => ({ word, frequency }))
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 50);
};

const calculateResponseTimes = (messages: any[]) => {
  const dailyTimes: { [key: string]: number[] } = {};

  for (let i = 1; i < messages.length; i++) {
    const current = messages[i];
    const previous = messages[i - 1];

    if (current.isUser !== previous.isUser) {
      const date = current.timestamp.toDateString();
      const responseTime =
        (current.timestamp.getTime() - previous.timestamp.getTime()) /
        (1000 * 60); // minutes

      if (!dailyTimes[date]) dailyTimes[date] = [];
      dailyTimes[date].push(Math.min(responseTime, 1440)); // Cap at 24 hours
    }
  }

  return Object.entries(dailyTimes)
    .map(([date, times]) => ({
      date,
      averageTime: times.reduce((a, b) => a + b, 0) / times.length,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-30); // Last 30 days
};

const calculateAverageResponseTime = (messages: any[]): number => {
  let totalTime = 0;
  let count = 0;

  for (let i = 1; i < messages.length; i++) {
    const current = messages[i];
    const previous = messages[i - 1];

    if (current.isUser !== previous.isUser) {
      totalTime +=
        (current.timestamp.getTime() - previous.timestamp.getTime()) /
        (1000 * 60);
      count++;
    }
  }

  return count > 0 ? Math.round(totalTime / count) : 0;
};

const getMostActiveDay = (messages: any[]): string => {
  const dayCounts: { [key: string]: number } = {};

  messages.forEach((message) => {
    const day = message.timestamp.toLocaleDateString("en-US", {
      weekday: "long",
    });
    dayCounts[day] = (dayCounts[day] || 0) + 1;
  });

  return (
    Object.entries(dayCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || "Sunday"
  );
};
