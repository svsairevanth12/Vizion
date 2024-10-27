import React, { useCallback } from 'react';
import { Upload, Image } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

export default function ImageUpload({ onImageUpload }: ImageUploadProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) {
        onImageUpload(file);
      }
    },
    [onImageUpload]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-gray-50 h-full flex flex-col items-center justify-center"
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload" className="cursor-pointer">
        <div className="bg-blue-50 p-4 rounded-full mb-4">
          <Image className="w-12 h-12 text-blue-500" />
        </div>
        <p className="text-lg font-medium text-gray-700 mb-2">
          Drag and drop an image here
        </p>
        <p className="text-sm text-gray-500">
          or click to select from your device
        </p>
        <p className="text-xs text-gray-400 mt-4">
          Supports: JPG, PNG, GIF (max 10MB)
        </p>
      </label>
    </div>
  );
}