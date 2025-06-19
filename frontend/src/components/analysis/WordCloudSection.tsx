import React from 'react';
import { Cloud } from 'lucide-react';

interface WordCloudSectionProps {
  words: Array<{
    word: string;
    frequency: number;
  }>;
}

export const WordCloudSection: React.FC<WordCloudSectionProps> = ({ words }) => {
  const maxFrequency = Math.max(...words.map(w => w.frequency));
  
  const getFontSize = (frequency: number) => {
    const ratio = frequency / maxFrequency;
    return Math.max(12, Math.min(32, 12 + ratio * 20));
  };

  const getColor = (index: number) => {
    const colors = [
      '#3B82F6', '#8B5CF6', '#EF4444', '#10B981', '#F59E0B',
      '#EC4899', '#6366F1', '#14B8A6', '#F97316', '#84CC16'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <Cloud className="h-6 w-6 text-cyan-400" />
        <h3 className="text-xl font-bold text-white">Word Cloud</h3>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-8 min-h-64 flex flex-wrap items-center justify-center gap-3">
        {words.slice(0, 30).map((word, index) => (
          <span
            key={index}
            className="font-bold hover:scale-110 transition-transform duration-200 cursor-default"
            style={{
              fontSize: `${getFontSize(word.frequency)}px`,
              color: getColor(index),
              opacity: 0.8 + (word.frequency / maxFrequency) * 0.2
            }}
          >
            {word.word}
          </span>
        ))}
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <div className="bg-gray-700/30 rounded-lg p-4">
          <p className="text-cyan-300 font-medium mb-1">Most Used</p>
          <p className="text-white text-lg font-bold">{words[0]?.word}</p>
          <p className="text-gray-400 text-sm">{words[0]?.frequency} times</p>
        </div>
        
        <div className="bg-gray-700/30 rounded-lg p-4">
          <p className="text-cyan-300 font-medium mb-1">Vocabulary</p>
          <p className="text-white text-lg font-bold">{words.length}</p>
          <p className="text-gray-400 text-sm">unique words</p>
        </div>
        
        <div className="bg-gray-700/30 rounded-lg p-4">
          <p className="text-cyan-300 font-medium mb-1">Expression</p>
          <p className="text-white text-lg font-bold">
            {words.length > 200 ? 'Rich' : words.length > 100 ? 'Moderate' : 'Simple'}
          </p>
          <p className="text-gray-400 text-sm">vocabulary range</p>
        </div>
      </div>
    </div>
  );
};