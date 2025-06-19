import React, { useCallback, useState } from "react";
import {
  Upload,
  FileText,
  Smartphone,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isUploading: boolean;
  error: string | null;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  isUploading,
  error,
}) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);

      const files = Array.from(e.dataTransfer.files);
      if (files[0]) {
        onFileSelect(files[0]);
      }
    },
    [onFileSelect]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  return (
    <div className="w-full">
      <div className="max-w-4xl w-full mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Discover Your Communication Patterns
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Upload your WhatsApp or SMS conversations to get AI-powered insights
            about your messaging behavior
          </p>

          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <FeatureCard
              icon={<MessageSquare className="h-6 w-6" />}
              title="Sentiment Analysis"
              description="Understand the emotional tone of your conversations"
            />
            <FeatureCard
              icon={<FileText className="h-6 w-6" />}
              title="Topic Discovery"
              description="Find out what you talk about most"
            />
            <FeatureCard
              icon={<Smartphone className="h-6 w-6" />}
              title="Response Patterns"
              description="Analyze your communication timing and habits"
            />
          </div>
        </div>

        <div
          className={`relative bg-gray-800/50 backdrop-blur-sm border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
            dragOver
              ? "border-blue-400 bg-blue-900/20"
              : "border-gray-600 hover:border-gray-500"
          } ${
            isUploading
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer hover:bg-gray-800/70"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".txt,.json,.xml"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />

          <div
            className={`transition-transform duration-300 ${
              dragOver ? "scale-110" : ""
            }`}
          >
            <Upload
              className={`h-16 w-16 mx-auto mb-6 transition-colors duration-300 ${
                dragOver ? "text-blue-400" : "text-gray-400"
              }`}
            />

            <h3 className="text-2xl font-semibold text-white mb-4">
              {isUploading
                ? "Processing your file..."
                : "Drop your chat file here"}
            </h3>

            <p className="text-gray-300 mb-6">or click to browse your files</p>

            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <FileTypeTag type="WhatsApp (.txt)" />
              <FileTypeTag type="SMS Export (.json)" />
              <FileTypeTag type="XML Format (.xml)" />
            </div>

            {isUploading && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-6 bg-red-900/50 border border-red-500 rounded-lg p-4 flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
            <p className="text-red-200">{error}</p>
          </div>
        )}

        <div className="mt-8 bg-gray-800/30 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            How to export your chats:
          </h4>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300">
            <div>
              <h5 className="font-medium text-white mb-2">WhatsApp:</h5>
              <ol className="list-decimal list-inside space-y-1">
                <li>Open the chat you want to analyze</li>
                <li>Tap the three dots menu</li>
                <li>Select "More" → "Export chat"</li>
                <li>Choose "Without Media"</li>
                <li>Share the .txt file</li>
              </ol>
            </div>
            <div>
              <h5 className="font-medium text-white mb-2">SMS:</h5>
              <ol className="list-decimal list-inside space-y-1">
                <li>Use SMS Backup & Restore app</li>
                <li>Create a backup of your messages</li>
                <li>Export as JSON or XML format</li>
                <li>Upload the exported file</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => (
  <div className="bg-gray-800/40 backdrop-blur-sm rounded-lg p-6 text-center max-w-xs">
    <div className="text-blue-400 mb-3 flex justify-center">{icon}</div>
    <h3 className="text-white font-semibold mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </div>
);

const FileTypeTag: React.FC<{ type: string }> = ({ type }) => (
  <span className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-blue-800">
    {type}
  </span>
);
