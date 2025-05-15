
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useDocuments } from '../context/DocumentsContext';
import DocumentCard from './DocumentCard';
import DocumentRow from './DocumentRow';
import EmptyState from './EmptyState';

const DocumentsList: React.FC = () => {
  const { filteredDocuments, viewMode } = useDocuments();

  if (filteredDocuments.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map(document => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredDocuments.map(document => (
                <DocumentRow key={document.id} document={document} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default DocumentsList;
