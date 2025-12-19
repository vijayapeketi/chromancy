import React, { useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { AppState, AuraResult } from './types';
import { analyzeVibe } from './services/gemini';
import FileUpload from './components/FileUpload';
import AuraCard from './components/AuraCard';
import { Loader, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [auraResult, setAuraResult] = useState<AuraResult | null>(null);
  const [imageSrc, setImageSrc] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError("Please upload an image file.");
      setAppState(AppState.ERROR);
      return;
    }

    setAppState(AppState.ANALYZING);
    setError(null);
    setImageSrc(URL.createObjectURL(file));

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const base64Image = (e.target?.result as string).split(',')[1];
        if (!base64Image) throw new Error("Could not read image data.");
        
        const result = await analyzeVibe(base64Image, file.type);
        setAuraResult(result);
        setAppState(AppState.REVEALED);
      } catch (err) {
        console.error(err);
        setError("The cosmos seem to be offline. Please try another image.");
        setAppState(AppState.ERROR);
      }
    };
    reader.onerror = () => {
      setError("Could not read the selected file.");
      setAppState(AppState.ERROR);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleReset = useCallback(() => {
    setAppState(AppState.IDLE);
    setAuraResult(null);
    if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
    }
    setImageSrc('');
    setError(null);
  }, [imageSrc]);
  
  const renderContent = () => {
    switch (appState) {
      case AppState.ANALYZING:
        return (
          <div className="flex flex-col items-center justify-center text-center p-8 animate-fade-in" aria-live="polite">
            <Loader className="w-12 h-12 text-purple-400 animate-spin mb-4" />
            <h3 className="text-xl font-bold text-white">Scrying the digital ether...</h3>
            <p className="text-white/60">Reading the vibes from your image.</p>
          </div>
        );
      case AppState.REVEALED:
        return auraResult && <AuraCard data={auraResult} imageSrc={imageSrc} onReset={handleReset} />;
      case AppState.ERROR:
        return (
          <div className="w-full max-w-md mx-auto text-center bg-red-900/50 border border-red-500/50 p-6 rounded-2xl animate-fade-in" role="alert">
              <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">An Anomaly Occurred</h3>
              <p className="text-red-200/80 text-sm mb-6">{error}</p>
              <button
                  onClick={handleReset}
                  className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold tracking-wide transition-all border border-white/10 hover:border-white/30 active:scale-95"
              >
                  Try Again
              </button>
          </div>
        );
      case AppState.IDLE:
      default:
        return <FileUpload onFileSelect={handleFileSelect} />;
    }
  };

  return (
    <main className="min-h-screen w-full bg-slate-900 bg-grid-white/[0.05] text-white relative flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-x-hidden">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-slate-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <header className={`text-center mb-8 z-10 transition-all duration-500 ${appState !== AppState.IDLE ? 'opacity-0 -translate-y-4 pointer-events-none' : 'animate-fade-in-down'}`}>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">Chromancy</h1>
        <p className="text-base md:text-lg text-white/60 mt-2 max-w-xl mx-auto">Upload a photo to reveal its energetic color palette, mystical vibe, and sonic identity.</p>
      </header>
      
      <div className="w-full flex-grow flex items-center justify-center z-10">
        {renderContent()}
      </div>

      <footer className="text-center text-white/30 text-xs py-4 z-10 absolute bottom-0">
        Powered by Gemini Vision.
      </footer>
    </main>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}