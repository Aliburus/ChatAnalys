import { useState, useCallback } from 'react';
import { ConversationData } from '../types';
import { parseWhatsAppText, parseSMSData } from '../utils/fileParser';

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = useCallback(async (file: File): Promise<ConversationData | null> => {
    setIsUploading(true);
    setError(null);

    try {
      const text = await file.text();
      let data: ConversationData;

      if (file.name.endsWith('.txt')) {
        data = parseWhatsAppText(text);
      } else if (file.name.endsWith('.json')) {
        data = parseSMSData(text);
      } else {
        throw new Error('Unsupported file format. Please upload a .txt or .json file.');
      }

      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse file');
      return null;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return { uploadFile, isUploading, error };
};