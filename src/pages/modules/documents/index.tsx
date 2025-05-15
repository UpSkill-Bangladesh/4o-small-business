
import React from 'react';
import DocumentsLayout from './DocumentsLayout';
import DocumentsList from './components/DocumentsList';
import CategoriesSidebar from './components/CategoriesSidebar';
import SearchFilterBar from './components/SearchFilterBar';
import DropZone from './components/DropZone';
import { DocumentsProvider } from './context/DocumentsContext';

const Documents: React.FC = () => {
  return (
    <DocumentsProvider>
      <DocumentsLayout title="Document Management">
        <div className="flex flex-col md:flex-row gap-6">
          <CategoriesSidebar />
          <div className="flex-1">
            <SearchFilterBar />
            <DocumentsList />
            <DropZone />
          </div>
        </div>
      </DocumentsLayout>
    </DocumentsProvider>
  );
};

export default Documents;
