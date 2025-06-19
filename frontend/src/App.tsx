// import "./App.css";
import { FileUpload } from "./components/upload/FileUpload";
import { useState } from "react";
import { uploadFile, analyzeContent } from "./services/fileService";

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const handleFileSelect = async (selected: File) => {
    setFile(selected);
    setError(null);
    setAnalysisResult(null);
    setIsUploading(true);
    try {
      const result = await uploadFile(selected);
      setFileContent(result.buffer || "");
    } catch (e: any) {
      setError("Dosya yüklenemedi");
    }
    setIsUploading(false);
  };

  const handleAnalyze = async () => {
    if (!fileContent) return;
    setIsUploading(true);
    setError(null);
    try {
      const result = await analyzeContent(fileContent);
      setAnalysisResult(result.result);
    } catch (e: any) {
      setError("Analiz sırasında hata oluştu");
    }
    setIsUploading(false);
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-y-auto">
      <div className="w-full max-w-4xl bg-white/10 rounded-2xl shadow-lg p-4 flex flex-col items-center backdrop-blur-md my-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-2 text-center">
          Chat Insight AI
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          WhatsApp veya SMS konuşmalarını yükle,{" "}
          <span className="font-semibold text-blue-600">
            en sık konuştuğun konuları
          </span>
          , <span className="font-semibold text-blue-600">duygu durumunu</span>{" "}
          ve{" "}
          <span className="font-semibold text-blue-600">iletişim tarzını</span>{" "}
          analiz et!
        </p>
        <FileUpload
          onFileSelect={handleFileSelect}
          isUploading={isUploading}
          error={error}
        />
        {file && (
          <div className="mt-4 w-full max-w-md bg-white/80 rounded-lg p-3 text-gray-900 text-sm flex flex-col items-center">
            <span className="font-semibold">Yüklenen dosya:</span>
            <span className="mt-1">
              {file.name} ({(file.size / 1024).toFixed(1)} KB) -{" "}
              {file.type || "Bilinmiyor"}
            </span>
          </div>
        )}
        {file && (
          <button
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
            onClick={handleAnalyze}
            disabled={isUploading}
          >
            {isUploading ? "Analiz Ediliyor..." : "Analiz Başlat"}
          </button>
        )}
        {analysisResult && (
          <div className="mt-8 w-full bg-white/80 rounded-lg p-4 text-gray-900">
            <h2 className="text-xl font-bold mb-2">AI Analiz Sonucu</h2>
            <div className="whitespace-pre-wrap break-words text-sm">
              {analysisResult.candidates?.[0]?.content?.parts?.[0]?.text ||
                "Sonuç bulunamadı."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
