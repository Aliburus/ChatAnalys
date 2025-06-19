import React from 'react';
import { MessageSquare, Users, Clock, Calendar } from 'lucide-react';

interface OverviewProps {
  overview: {
    totalMessages: number;
    participantCount: number;
    averageResponseTime: number;
    mostActiveDay: string;
  };
}

export const OverviewCards: React.FC<OverviewProps> = ({ overview }) => {
  const cards = [
    {
      icon: MessageSquare,
      title: 'Total Messages',
      value: overview.totalMessages.toLocaleString(),
      subtitle: 'Messages analyzed',
      color: 'blue'
    },
    {
      icon: Users,
      title: 'Participants',
      value: overview.participantCount.toString(),
      subtitle: 'People in conversations',
      color: 'purple'
    },
    {
      icon: Clock,
      title: 'Avg Response Time',
      value: `${overview.averageResponseTime}m`,
      subtitle: 'Minutes to respond',
      color: 'green'
    },
    {
      icon: Calendar,
      title: 'Most Active Day',
      value: overview.mostActiveDay,
      subtitle: 'Peak activity',
      color: 'orange'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const colorClasses = {
          blue: 'from-blue-500 to-blue-600',
          purple: 'from-purple-500 to-purple-600',
          green: 'from-green-500 to-green-600',
          orange: 'from-orange-500 to-orange-600'
        };
        
        return (
          <div
            key={index}
            className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses[card.color as keyof typeof colorClasses]}`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-1">{card.value}</h3>
            <p className="text-gray-400 text-sm font-medium mb-1">{card.title}</p>
            <p className="text-gray-500 text-xs">{card.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
};