import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Timer } from 'lucide-react';

interface ResponseTimeChartProps {
  data: Array<{
    date: string;
    averageTime: number;
  }>;
  detailed?: boolean;
}

export const ResponseTimeChart: React.FC<ResponseTimeChartProps> = ({ data, detailed = false }) => {
  const averageResponseTime = data.reduce((sum, item) => sum + item.averageTime, 0) / data.length;
  const fastestResponse = Math.min(...data.map(d => d.averageTime));
  const slowestResponse = Math.max(...data.map(d => d.averageTime));

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${Math.round(minutes)}m`;
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };

  const chartData = data.map(item => ({
    ...item,
    formattedDate: new Date(item.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }));

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <Timer className="h-6 w-6 text-indigo-400" />
        <h3 className="text-xl font-bold text-white">Response Time Trends</h3>
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="formattedDate" 
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF" 
              fontSize={12}
              tickFormatter={formatTime}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: 'white'
              }}
              formatter={(value) => [formatTime(value as number), 'Avg Response Time']}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Line 
              type="monotone" 
              dataKey="averageTime" 
              stroke="#6366F1" 
              strokeWidth={2}
              dot={{ fill: '#6366F1', r: 4 }}
              activeDot={{ r: 6, fill: '#8B5CF6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-indigo-900/20 border border-indigo-800/50 rounded-lg p-4">
          <p className="text-indigo-300 font-medium mb-1">Average</p>
          <p className="text-white text-xl font-bold">{formatTime(averageResponseTime)}</p>
          <p className="text-gray-400 text-sm">typical response</p>
        </div>
        
        <div className="bg-green-900/20 border border-green-800/50 rounded-lg p-4">
          <p className="text-green-300 font-medium mb-1">Fastest</p>
          <p className="text-white text-xl font-bold">{formatTime(fastestResponse)}</p>
          <p className="text-gray-400 text-sm">quickest reply</p>
        </div>
        
        <div className="bg-orange-900/20 border border-orange-800/50 rounded-lg p-4">
          <p className="text-orange-300 font-medium mb-1">Slowest</p>
          <p className="text-white text-xl font-bold">{formatTime(slowestResponse)}</p>
          <p className="text-gray-400 text-sm">longest delay</p>
        </div>
      </div>

      {detailed && (
        <div className="mt-6 bg-gray-700/30 rounded-lg p-4">
          <h4 className="text-white font-medium mb-2">Response Pattern Analysis</h4>
          <p className="text-gray-400 text-sm">
            {averageResponseTime < 30 
              ? "You're a quick responder! Your average response time shows you're actively engaged in conversations."
              : averageResponseTime < 120
              ? "You maintain good communication timing, typically responding within a reasonable timeframe."
              : "You tend to take your time before responding, which might indicate thoughtful consideration of your messages."
            }
          </p>
        </div>
      )}
    </div>
  );
};