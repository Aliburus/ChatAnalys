import { ConversationData, Message } from '../types';

export const parseWhatsAppText = (text: string): ConversationData => {
  const lines = text.split('\n').filter(line => line.trim());
  const messages: Message[] = [];
  const participants = new Set<string>();
  
  const whatsAppRegex = /^\[?(\d{1,2}\/\d{1,2}\/\d{2,4}),?\s*(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AP]M)?)\]?\s*-?\s*([^:]+):\s*(.+)$/i;
  
  lines.forEach((line, index) => {
    const match = line.match(whatsAppRegex);
    if (match) {
      const [, date, time, sender, content] = match;
      const timestamp = parseWhatsAppDate(date, time);
      
      if (timestamp) {
        const cleanSender = sender.trim();
        participants.add(cleanSender);
        
        messages.push({
          id: `msg-${index}`,
          timestamp,
          sender: cleanSender,
          content: content.trim(),
          isUser: cleanSender.toLowerCase() === 'you' || cleanSender.toLowerCase() === 'sen'
        });
      }
    }
  });

  const sortedMessages = messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  
  return {
    messages: sortedMessages,
    participants: Array.from(participants),
    dateRange: {
      start: sortedMessages[0]?.timestamp || new Date(),
      end: sortedMessages[sortedMessages.length - 1]?.timestamp || new Date()
    }
  };
};

export const parseSMSData = (jsonText: string): ConversationData => {
  try {
    const data = JSON.parse(jsonText);
    const messages: Message[] = [];
    const participants = new Set<string>();

    if (Array.isArray(data)) {
      data.forEach((item, index) => {
        if (item.body && item.address && item.date) {
          const timestamp = new Date(parseInt(item.date));
          const sender = item.type === '1' ? 'You' : item.address;
          
          participants.add(sender);
          
          messages.push({
            id: `sms-${index}`,
            timestamp,
            sender,
            content: item.body,
            isUser: item.type === '1'
          });
        }
      });
    }

    const sortedMessages = messages.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    
    return {
      messages: sortedMessages,
      participants: Array.from(participants),
      dateRange: {
        start: sortedMessages[0]?.timestamp || new Date(),
        end: sortedMessages[sortedMessages.length - 1]?.timestamp || new Date()
      }
    };
  } catch (error) {
    throw new Error('Invalid JSON format');
  }
};

const parseWhatsAppDate = (dateStr: string, timeStr: string): Date | null => {
  try {
    const [month, day, year] = dateStr.split('/').map(Number);
    const fullYear = year < 100 ? 2000 + year : year;
    
    let [hours, minutes] = timeStr.replace(/[AP]M/i, '').split(':').map(Number);
    
    if (timeStr.toUpperCase().includes('PM') && hours < 12) {
      hours += 12;
    } else if (timeStr.toUpperCase().includes('AM') && hours === 12) {
      hours = 0;
    }
    
    return new Date(fullYear, month - 1, day, hours, minutes);
  } catch (error) {
    return null;
  }
};