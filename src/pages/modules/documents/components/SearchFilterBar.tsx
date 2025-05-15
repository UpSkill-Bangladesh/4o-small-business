
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Grid2x2, List, XCircle } from "lucide-react";
import { useDocuments } from '../context/DocumentsContext';

const SearchFilterBar: React.FC = () => {
  const { searchQuery, setSearchQuery, viewMode, setViewMode } = useDocuments();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <div className="relative w-full md:w-auto flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Search documents by name or tag..."
          className="pl-10 pr-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            onClick={() => setSearchQuery('')}
          >
            <XCircle size={18} />
          </button>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          className={viewMode === 'grid' ? 'bg-gray-100' : ''}
          onClick={() => setViewMode('grid')}
        >
          <Grid2x2 className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          className={viewMode === 'list' ? 'bg-gray-100' : ''}
          onClick={() => setViewMode('list')}
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SearchFilterBar;
