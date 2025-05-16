
import { Document } from '../types';
import { FileText } from 'lucide-react';
import React from 'react';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric',
    month: 'short', 
    day: 'numeric'
  });
};

// Get document icon based on type
export const getDocumentIcon = (type: string) => {
  switch (type) {
    case 'tax':
      return <FileText className="h-10 w-10 text-green-600" />;
    case 'hr':
      return <FileText className="h-10 w-10 text-blue-600" />;
    case 'contract':
      return <FileText className="h-10 w-10 text-purple-600" />;
    case 'insurance':
      return <FileText className="h-10 w-10 text-yellow-600" />;
    case 'financial':
      return <FileText className="h-10 w-10 text-red-600" />;
    case 'planning':
      return <FileText className="h-10 w-10 text-indigo-600" />;
    default:
      return <FileText className="h-10 w-10 text-gray-600" />;
  }
};

// Filter documents based on search query and category
export const filterDocuments = (
  documents: Document[],
  searchQuery: string,
  selectedCategory: string | null
): Document[] => {
  return documents.filter(doc => {
    const matchesSearch = searchQuery === '' || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === null || doc.type === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
};
