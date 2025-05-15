
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Document } from '../types';
import { formatDate, getDocumentIcon } from '../utils/documentUtils';

interface DocumentCardProps {
  document: Document;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-4 flex flex-col h-full">
          <div className="flex items-center mb-3">
            {getDocumentIcon(document.type)}
            <div className="ml-3">
              <h3 className="font-medium text-sm line-clamp-1" title={document.name}>
                {document.name}
              </h3>
              <p className="text-gray-500 text-xs">
                {document.size} • {formatDate(document.dateAdded)}
              </p>
            </div>
          </div>
          
          <div className="mt-auto pt-3">
            <div className="flex flex-wrap gap-2 mb-3">
              {document.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex justify-between mt-2">
              <Button variant="outline" size="sm" className="w-full mr-1">
                View
              </Button>
              <Button variant="outline" size="sm" className="w-full ml-1">
                Download
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentCard;
