
import React from 'react';
import { Upload } from "lucide-react";

const DropZone: React.FC = () => {
  return (
    <div className="mt-6 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
      <div className="mx-auto flex flex-col items-center">
        <Upload className="h-10 w-10 text-gray-400 mb-3" />
        <h3 className="text-lg font-medium text-gray-900">Drag and drop files here</h3>
        <p className="text-sm text-gray-500 mt-1">
          or <span className="text-nyc-primary font-medium">browse</span> to upload
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Supports PDF, Word, Excel, PowerPoint, and image files up to 25MB
        </p>
      </div>
    </div>
  );
};

export default DropZone;
