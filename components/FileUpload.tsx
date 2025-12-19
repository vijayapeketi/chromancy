import React, { useRef } from 'react';
import { Upload, Camera, Sparkles } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div 
      className="w-full max-w-md mx-auto aspect-[4/3] rounded-3xl border-2 border-dashed border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 flex flex-col items-center justify-center cursor-pointer group relative overflow-hidden"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleInputChange} 
        className="hidden" 
        accept="image/*"
      />
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col items-center text-center p-6">
        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)]">
          <Upload className="w-8 h-8 text-white/90" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Upload visual artifact</h3>
        <p className="text-white/60 text-sm mb-6">Drop a selfie, room pic, or object</p>
        
        <div className="flex gap-3">
            <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/70 flex items-center gap-1">
                <Camera size={12} /> Photo
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white/70 flex items-center gap-1">
                <Sparkles size={12} /> Vibes
            </span>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
