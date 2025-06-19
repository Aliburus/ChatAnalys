import React from 'react';
import { MessageSquare, Shield, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentStep: string;
}

export const Header: React.FC<HeaderProps> = ({ currentStep }) => {
  return (
    <header className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <MessageSquare className="h-8 w-8 text-blue-400" />
              <Sparkles className="h-4 w-4 text-purple-400 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Chat Insight AI</h1>
              <p className="text-xs text-gray-300">Personal Message Analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Shield className="h-4 w-4 text-green-400" />
              <span>Privacy Protected</span>
            </div>
            
            <div className="hidden sm:flex items-center space-x-4 text-sm">
              <StepIndicator step="upload" currentStep={currentStep} label="Upload" />
              <div className="w-8 h-px bg-gray-600"></div>
              <StepIndicator step="processing" currentStep={currentStep} label="Analysis" />
              <div className="w-8 h-px bg-gray-600"></div>
              <StepIndicator step="results" currentStep={currentStep} label="Results" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const StepIndicator: React.FC<{ step: string; currentStep: string; label: string }> = ({ 
  step, 
  currentStep, 
  label 
}) => {
  const isActive = currentStep === step;
  const isCompleted = ['upload', 'processing'].indexOf(step) < ['upload', 'processing'].indexOf(currentStep);
  
  return (
    <div className={`flex items-center space-x-1 ${isActive ? 'text-blue-400' : isCompleted ? 'text-green-400' : 'text-gray-500'}`}>
      <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-blue-400' : isCompleted ? 'bg-green-400' : 'bg-gray-500'}`}></div>
      <span className="text-xs font-medium">{label}</span>
    </div>
  );
};