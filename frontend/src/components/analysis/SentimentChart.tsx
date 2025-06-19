import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Heart, Frown, Meh } from 'lucide-react';

interface SentimentChartProps {
  data: {
    positive: number;
    negative: number;
    neutral: number;
  };
  detailed?: boolean;
}

export const SentimentChart: React.FC<SentimentChartProps> = ({ data, detailed = false }) => {
  const chartData = [
    { name: 'Positive', value: data.positive, color: '#10B981', icon: Heart },
    { name: 'Neutral', value: data.neutral, color: '#6B7280', icon: Meh },
    { name: 'Negative', value: data.negative, color: '#EF4444', icon: Frown }
  ];

  const insights = [
    {
      title: 'Overall Mood',
      description: data.positive > 50 ? 'Your conversations tend to be positive!' : 
                  data.negative > 30 ? 'You might want to focus on more positive interactions' :
                  'You maintain a balanced emotional tone'
    },
    {
      title: 'Emotional Range',
      description: `You express ${data.positive}% positive, ${data.neutral}% neutral, and ${data.negative}% negative sentiment`
    }
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <Heart className="h-6 w-6 text-pink-400" />
        <h3 className="text-xl font-bold text-white">Sentiment Analysis</h3>
      </div>

      <div className={`grid ${detailed ? 'lg:grid-cols-1' : 'lg:grid-cols-2'} gap-6`}>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Messages']}
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: 'white'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {chartData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-700/30 rounded-lg">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${item.color}20` }}>
                  <Icon className="h-5 w-5" style={{ color: item.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{item.name}</p>
                  <p className="text-gray-400 text-sm">{item.value}% of messages</p>
                </div>
                <div className="text-2xl font-bold text-white">{item.value}%</div>
              </div>
            );
          })}
        </div>
      </div>

      {detailed && (
        <div className="mt-8 space-y-4">
          <h4 className="text-lg font-semibold text-white">Insights</h4>
          {insights.map((insight, index) => (
            <div key={index} className="bg-gray-700/30 rounded-lg p-4">
              <p className="text-white font-medium mb-1">{insight.title}</p>
              <p className="text-gray-400 text-sm">{insight.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};