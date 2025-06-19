import React from 'react';
import { Users, User } from 'lucide-react';

interface CommunicationStyleProps {
  style: {
    userStyle: string;
    participantStyles: Array<{
      name: string;
      style: string;
      tone: string;
    }>;
  };
}

export const CommunicationStyleSection: React.FC<CommunicationStyleProps> = ({ style }) => {
  return (
    <div className="space-y-6">
      {/* User's Style */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <User className="h-6 w-6 text-green-400" />
          <h3 className="text-xl font-bold text-white">Your Communication Style</h3>
        </div>
        
        <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg p-6 border border-green-800/50">
          <h4 className="text-2xl font-bold text-white mb-2">{style.userStyle}</h4>
          <p className="text-gray-300">
            {getStyleDescription(style.userStyle)}
          </p>
        </div>
      </div>

      {/* Others' Styles */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <Users className="h-6 w-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">How Others Communicate With You</h3>
        </div>
        
        <div className="grid gap-4">
          {style.participantStyles.map((participant, index) => (
            <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold">{participant.name}</h4>
                <span className="text-purple-400 text-sm font-medium">{participant.tone}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="bg-blue-900/40 text-blue-300 px-3 py-1 rounded-full text-sm">
                  {participant.style}
                </span>
                <p className="text-gray-400 text-sm">
                  {getToneDescription(participant.tone)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const getStyleDescription = (style: string): string => {
  const descriptions: { [key: string]: string } = {
    'Direct': 'You communicate in a straightforward manner, getting to the point quickly without unnecessary elaboration.',
    'Casual': 'Your messaging style is relaxed and informal, creating a comfortable atmosphere in conversations.',
    'Formal': 'You tend to use proper grammar and structured language, maintaining a professional tone.',
    'Emotional': 'You express feelings openly and use emotionally rich language in your messages.',
    'Analytical': 'You prefer detailed explanations and logical reasoning in your communication.'
  };
  
  return descriptions[style] || 'Your communication style is unique and adaptive to different situations.';
};

const getToneDescription = (tone: string): string => {
  const descriptions: { [key: string]: string } = {
    'Friendly': 'Warm and approachable in conversations',
    'Professional': 'Maintains a business-like demeanor',
    'Enthusiastic': 'Shows excitement and energy',
    'Reserved': 'More cautious and measured in responses',
    'Supportive': 'Encouraging and helpful in interactions'
  };
  
  return descriptions[tone] || 'Has a distinctive communication approach';
};