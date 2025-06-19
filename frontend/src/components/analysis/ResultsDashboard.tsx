import React, { useState } from 'react';
import { AnalysisResult } from '../../types';
import { OverviewCards } from './OverviewCards';
import { SentimentChart } from './SentimentChart';
import { TopicsSection } from './TopicsSection';
import { CommunicationStyleSection } from './CommunicationStyleSection';
import { TimePatternChart } from './TimePatternChart';
import { WordCloudSection } from './WordCloudSection';
import { ResponseTimeChart } from './ResponseTimeChart';
import { Navigation } from './Navigation';

interface ResultsDashboardProps {
  results: AnalysisResult;
  onReset: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ results, onReset }) => {
  const [activeSection, setActiveSection] = useState('overview');

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            <OverviewCards overview={results.overview} />
            <div className="grid lg:grid-cols-2 gap-8">
              <SentimentChart data={results.sentimentAnalysis} />
              <TopicsSection topics={results.topTopics} />
            </div>
          </div>
        );
      case 'sentiment':
        return (
          <div className="space-y-8">
            <SentimentChart data={results.sentimentAnalysis} detailed />
            <ResponseTimeChart data={results.responseTimeData} />
          </div>
        );
      case 'topics':
        return (
          <div className="space-y-8">
            <TopicsSection topics={results.topTopics} detailed />
            <WordCloudSection words={results.wordCloud} />
          </div>
        );
      case 'communication':
        return (
          <div className="space-y-8">
            <CommunicationStyleSection style={results.communicationStyle} />
            <TimePatternChart data={results.timePatterns} />
          </div>
        );
      case 'patterns':
        return (
          <div className="space-y-8">
            <TimePatternChart data={results.timePatterns} detailed />
            <ResponseTimeChart data={results.responseTimeData} detailed />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="flex">
        <Navigation 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
          onReset={onReset}
        />
        
        <main className="flex-1 p-6 lg:p-8 ml-64">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Your Communication Insights
              </h2>
              <p className="text-gray-300">
                Discover patterns and insights from your conversation analysis
              </p>
            </div>
            
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};