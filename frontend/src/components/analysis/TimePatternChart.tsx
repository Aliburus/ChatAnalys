import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock } from 'lucide-react';

interface TimePatternChartProps {
  data: Array<{
    hour: number;
    messageCount: number;
  }>;
  detailed?: boolean;
}

export const TimePatternChart: React.FC<TimePatternChartProps> = ({ data, detailed = false }) => {
  const peakHour = data.reduce((peak, current) => 
    current.messageCount > peak.messageCount ? current : peak
  );

  const formatHour = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  const chartData = data.map(item => ({
    ...item,
    hourLabel: formatHour(item.hour)
  }));

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <Clock className="h-6 w-6 text-orange-400" />
        <h3 className="text-xl font-bold text-white">Activity Patterns</h3>
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="hourLabel" 
              stroke="#9CA3AF"
              fontSize={12}
              interval={2}
            />
            <YAxis stroke="#9CA3AF" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: 'white'
              }}
              formatter={(value) => [`${value}`, 'Messages']}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Bar 
              dataKey="messageCount" 
              fill="url(#timeGradient)"
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="timeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#D97706" stopOpacity={0.6} />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-orange-900/20 border border-orange-800/50 rounded-lg p-4">
          <p className="text-orange-300 font-medium mb-1">Peak Activity</p>
          <p className="text-white text-xl font-bold">{formatHour(peakHour.hour)}</p>
          <p className="text-gray-400 text-sm">{peakHour.messageCount} messages</p>
        </div>
        
        <div className="bg-gray-700/30 rounded-lg p-4">
          <p className="text-gray-300 font-medium mb-1">Activity Pattern</p>
          <p className="text-white text-sm">
            {peakHour.hour >= 6 && peakHour.hour < 12 ? 'Morning person' :
             peakHour.hour >= 12 && peakHour.hour < 18 ? 'Afternoon active' :
             peakHour.hour >= 18 && peakHour.hour < 22 ? 'Evening communicator' :
             'Night owl'}
          </p>
        </div>
      </div>

      {detailed && (
        <div className="mt-6 bg-gray-700/30 rounded-lg p-4">
          <h4 className="text-white font-medium mb-2">Insights</h4>
          <p className="text-gray-400 text-sm">
            Your most active messaging time is {formatHour(peakHour.hour)}, suggesting you're most 
            engaged in conversations during this period. This pattern can help you understand your 
            communication rhythms and optimize your availability for important conversations.
          </p>
        </div>
      )}
    </div>
  );
};