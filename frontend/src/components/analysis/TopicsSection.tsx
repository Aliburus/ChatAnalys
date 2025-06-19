import React from 'react';
import { MessageSquare, Tag } from 'lucide-react';

interface TopicsSectionProps {
  topics: Array<{
    topic: string;
    frequency: number;
  }>;
  detailed?: boolean;
}

export const TopicsSection: React.FC<TopicsSectionProps> = ({ topics, detailed = false }) => {
  const maxFrequency = Math.max(...topics.map(t => t.frequency));

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <Tag className="h-6 w-6 text-blue-400" />
        <h3 className="text-xl font-bold text-white">Most Discussed Topics</h3>
      </div>

      <div className="space-y-4">
        {topics.map((topic, index) => {
          const percentage = (topic.frequency / maxFrequency) * 100;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-medium capitalize">{topic.topic}</span>
                <span className="text-gray-400 text-sm">{topic.frequency} mentions</span>
              </div>
              
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>

      {detailed && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold text-white mb-4">Topic Insights</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-700/30 rounded-lg p-4">
              <p className="text-white font-medium mb-1">Primary Interest</p>
              <p className="text-gray-400 text-sm">
                You talk most about <span className="text-blue-400 font-medium">{topics[0]?.topic}</span>
              </p>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4">
              <p className="text-white font-medium mb-1">Topic Diversity</p>
              <p className="text-gray-400 text-sm">
                You discuss {topics.length} different main topics regularly
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};