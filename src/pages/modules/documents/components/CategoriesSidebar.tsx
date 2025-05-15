
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderOpen, Tag } from "lucide-react";
import { useDocuments } from '../context/DocumentsContext';

const CategoriesSidebar: React.FC = () => {
  const { categories, selectedCategory, setSelectedCategory, documents, setSearchQuery } = useDocuments();
  
  return (
    <div className="w-full md:w-64 flex-shrink-0">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div 
              className={`flex justify-between items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 ${selectedCategory === null ? 'bg-gray-100 font-medium' : ''}`}
              onClick={() => setSelectedCategory(null)}
            >
              <div className="flex items-center">
                <FolderOpen className="h-5 w-5 mr-2 text-gray-600" />
                <span>All Documents</span>
              </div>
              <Badge variant="secondary">{documents.length}</Badge>
            </div>
            
            {categories.map(category => (
              <div 
                key={category.id}
                className={`flex justify-between items-center p-2 rounded-md cursor-pointer hover:bg-gray-100 ${selectedCategory === category.id ? 'bg-gray-100 font-medium' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="flex items-center">
                  <FolderOpen className={`h-5 w-5 mr-2 ${category.color.split(' ')[1]}`} />
                  <span>{category.name}</span>
                </div>
                <Badge variant="secondary">{category.count}</Badge>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-3">Recent Tags</h3>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant="outline" 
                className="cursor-pointer" 
                onClick={() => setSearchQuery('2025')}
              >
                2025
              </Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer" 
                onClick={() => setSearchQuery('hr')}
              >
                hr
              </Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer" 
                onClick={() => setSearchQuery('contract')}
              >
                contract
              </Badge>
              <Badge 
                variant="outline" 
                className="cursor-pointer" 
                onClick={() => setSearchQuery('tax')}
              >
                tax
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesSidebar;
