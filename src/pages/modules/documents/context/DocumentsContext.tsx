
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DocumentsState } from '../types';
import { documents, categories } from '../data/mockData';
import { filterDocuments } from '../utils/documentUtils';

const initialState: DocumentsState = {
  documents,
  categories,
  searchQuery: '',
  selectedCategory: null,
  viewMode: 'grid'
};

interface DocumentsContextType extends DocumentsState {
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  filteredDocuments: typeof documents;
}

const DocumentsContext = createContext<DocumentsContextType | undefined>(undefined);

export const DocumentsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState(initialState.searchQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialState.selectedCategory);
  const [viewMode, setViewMode] = useState(initialState.viewMode);

  const filteredDocuments = filterDocuments(documents, searchQuery, selectedCategory);

  return (
    <DocumentsContext.Provider 
      value={{
        documents,
        categories,
        searchQuery,
        selectedCategory,
        viewMode,
        setSearchQuery,
        setSelectedCategory,
        setViewMode,
        filteredDocuments
      }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentsContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentsProvider');
  }
  return context;
};
