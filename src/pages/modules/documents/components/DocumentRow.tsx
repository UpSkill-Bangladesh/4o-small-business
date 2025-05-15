
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Document } from '../types';
import { formatDate, getDocumentIcon } from '../utils/documentUtils';

interface DocumentRowProps {
  document: Document;
}

const DocumentRow: React.FC<DocumentRowProps> = ({ document }) => {
  return (
    <div className="p-4 flex items-center hover:bg-gray-50">
      <div className="mr-4">
        {getDocumentIcon(document.type)}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium" title={document.name}>
              {document.name}
            </h3>
            <p className="text-gray-500 text-sm">
              {document.category} • {document.size} • {formatDate(document.dateAdded)}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              View
            </Button>
            <Button variant="outline" size="sm">
              Download
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {document.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentRow;
