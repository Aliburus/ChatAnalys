import React, { useEffect, useState } from 'react';
import { Brain, MessageSquare, TrendingUp, Users, Clock, Zap } from 'lucide-react';

interface ProcessingScreenProps {
  onComplete: () => void;
}

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    { icon: MessageSquare, title: 'Parsing Messages', description: 'Reading and organizing your conversation data' },
    { icon: Brain, title: 'AI Analysis', description: 'Analyzing sentiment and communication patterns' },
    { icon: TrendingUp, title: 'Pattern Recognition', description: 'Identifying trends and behavioral insights' },
    { icon: Users, title: 'Relationship Mapping', description: 'Understanding interaction dynamics' },
    { icon: Clock, title: 'Temporal Analysis', description: 'Examining timing and frequency patterns' },
    { icon: Zap, title: 'Generating Insights', description: 'Compiling your personalized report' }
  ];

  useEffect(() => {
    const stepDuration = 2000; // 2 seconds per step
    const progressInterval = 50; // Update progress every 50ms
    const progressIncrement = 100 / (stepDuration / progressInterval);

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + progressIncrement;
        if (newProgress >= 100) {
          setCurrentStep(prevStep => {
            const nextStep = prevStep + 1;
            if (nextStep >= steps.length) {
              clearInterval(progressTimer);
              setTimeout(onComplete, 500);
              return prevStep;
            }
            return nextStep;
          });
          return 0;
        }
        return newProgress;
      });
    }, progressInterval);

    return () => clearInterval(progressTimer);
  }, [currentStep, onComplete, steps.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Analyzing Your Conversations</h2>
          <p className="text-xl text-gray-300">
            Our AI is processing your messages to uncover fascinating insights about your communication style
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <div className="space-y-6">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-500 ${
                    isActive ? 'bg-blue-900/40 scale-105' : isCompleted ? 'bg-green-900/20' : 'bg-gray-800/30'
                  }`}
                >
                  <div className={`p-3 rounded-full transition-colors duration-300 ${
                    isActive ? 'bg-blue-500 animate-pulse' : 
                    isCompleted ? 'bg-green-500' : 'bg-gray-600'
                  }`}>
                    <StepIcon className="h-6 w-6 text-white" />
                  </div>
                  
                  <div className="flex-1 text-left">
                    <h3 className={`font-semibold transition-colors duration-300 ${
                      isActive ? 'text-blue-300' : isCompleted ? 'text-green-300' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm transition-colors duration-300 ${
                      isActive ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                  
                  {isActive && (
                    <div className="w-12 h-12 relative">
                      <div className="w-full h-full rounded-full border-2 border-gray-600"></div>
                      <div 
                        className="absolute top-0 left-0 w-full h-full rounded-full border-2 border-blue-400 transition-all duration-100"
                        style={{ 
                          transform: `rotate(${(progress / 100) * 360}deg)`,
                          borderRightColor: 'transparent',
                          borderBottomColor: 'transparent'
                        }}
                      ></div>
                    </div>
                  )}
                  
                  {isCompleted && (
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 border-l-2 border-b-2 border-white transform rotate-[-45deg] translate-y-[-1px]"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center space-x-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i <= currentStep ? 'bg-blue-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        <div className="mt-8 text-gray-400 text-sm">
          <p>🔒 Your data is processed securely and will not be stored permanently</p>
        </div>
      </div>
    </div>
  );
};