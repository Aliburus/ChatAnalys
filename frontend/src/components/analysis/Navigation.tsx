import React from 'react';
import { 
  Home, 
  Heart, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  RotateCcw,
  BarChart3
} from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onReset: () => void;
}

const navigationItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'sentiment', label: 'Sentiment', icon: Heart },
  { id: 'topics', label: 'Topics', icon: MessageSquare },
  { id: 'communication', label: 'Communication', icon: Users },
  { id: 'patterns', label: 'Time Patterns', icon: TrendingUp },
];

export const Navigation: React.FC<NavigationProps> = ({ 
  activeSection, 
  onSectionChange, 
  onReset 
}) => {
  return (
    <nav className="fixed left-0 top-16 h-full w-64 bg-gray-800/50 backdrop-blur-sm border-r border-gray-700 p-4">
      <div className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
      
      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={onReset}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-700/50 hover:text-white transition-all duration-200"
        >
          <RotateCcw className="h-5 w-5" />
          <span className="font-medium">New Analysis</span>
        </button>
      </div>
    </nav>
  );
};