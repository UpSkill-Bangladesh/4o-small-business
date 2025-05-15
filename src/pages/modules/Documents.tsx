
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { FileText, Menu, Search, Upload, Filter, FolderOpen, Tag, XCircle, Grid2x2, List } from "lucide-react";
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock data for documents
const documents = [
  {
    id: "doc-001",
    name: "W-9 Tax Form.pdf",
    type: "tax",
    category: "Tax Documents",
    dateAdded: "2025-03-15",
    size: "245 KB",
    tags: ["tax", "2025", "irs"]
  },
  {
    id: "doc-002",
    name: "Employee Handbook.docx",
    type: "hr",
    category: "HR Documents",
    dateAdded: "2024-11-22",
    size: "1.2 MB",
    tags: ["hr", "policy", "employees"]
  },
  {
    id: "doc-003",
    name: "Office Lease Agreement.pdf",
    type: "contract",
    category: "Legal Documents",
    dateAdded: "2024-09-05",
    size: "890 KB",
    tags: ["legal", "contract", "property"]
  },
  {
    id: "doc-004",
    name: "Insurance Policy.pdf",
    type: "insurance",
    category: "Insurance",
    dateAdded: "2024-12-10",
    size: "1.5 MB",
    tags: ["insurance", "policy", "liability"]
  },
  {
    id: "doc-005",
    name: "Business Plan 2025.pptx",
    type: "planning",
    category: "Business Planning",
    dateAdded: "2025-01-05",
    size: "3.2 MB",
    tags: ["planning", "2025", "strategy"]
  },
  {
    id: "doc-006",
    name: "Q1 Financial Statement.xlsx",
    type: "financial",
    category: "Financial Documents",
    dateAdded: "2025-04-10",
    size: "780 KB",
    tags: ["financial", "2025", "q1"]
  },
  {
    id: "doc-007",
    name: "Client Contract - ABC Corp.pdf",
    type: "contract",
    category: "Client Contracts",
    dateAdded: "2025-02-18",
    size: "1.1 MB",
    tags: ["client", "contract", "abc-corp"]
  },
  {
    id: "doc-008",
    name: "Employee Onboarding Checklist.pdf",
    type: "hr",
    category: "HR Documents",
    dateAdded: "2025-01-15",
    size: "420 KB",
    tags: ["hr", "onboarding", "checklist"]
  }
];

// Define document categories with icons and colors
const categories = [
  { 
    id: "tax", 
    name: "Tax Documents", 
    count: 12,
    color: "bg-green-100 text-green-700" 
  },
  { 
    id: "hr", 
    name: "HR Documents", 
    count: 8,
    color: "bg-blue-100 text-blue-700" 
  },
  { 
    id: "contract", 
    name: "Contracts", 
    count: 15,
    color: "bg-purple-100 text-purple-700" 
  },
  { 
    id: "insurance", 
    name: "Insurance", 
    count: 5,
    color: "bg-yellow-100 text-yellow-700" 
  },
  { 
    id: "financial", 
    name: "Financial", 
    count: 10,
    color: "bg-red-100 text-red-700" 
  },
  { 
    id: "planning", 
    name: "Planning", 
    count: 7,
    color: "bg-indigo-100 text-indigo-700" 
  }
];

// Define the document icon mappings
const getDocumentIcon = (type: string) => {
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

const Documents: React.FC = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    });
  };
  
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchQuery === '' || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === null || doc.type === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="flex h-screen bg-gray-50">
      {!isMobile && <Sidebar />}
      {isMobile && (
        <Sidebar
          isMobile={true}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          )}
          
          <h1 className="text-xl md:text-2xl font-semibold text-nyc-primary">
            Document Management
          </h1>
          
          <div className="flex items-center space-x-4">
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Sidebar - Categories */}
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
                      <Badge variant="outline" className="cursor-pointer" onClick={() => setSearchQuery('2025')}>
                        2025
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer" onClick={() => setSearchQuery('hr')}>
                        hr
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer" onClick={() => setSearchQuery('contract')}>
                        contract
                      </Badge>
                      <Badge variant="outline" className="cursor-pointer" onClick={() => setSearchQuery('tax')}>
                        tax
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Main Content - Document List */}
            <div className="flex-1">
              {/* Search and Filter */}
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
              
              {/* Documents List - Grid View */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredDocuments.map(doc => (
                    <Card key={doc.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="p-4 flex flex-col h-full">
                          <div className="flex items-center mb-3">
                            {getDocumentIcon(doc.type)}
                            <div className="ml-3">
                              <h3 className="font-medium text-sm line-clamp-1" title={doc.name}>
                                {doc.name}
                              </h3>
                              <p className="text-gray-500 text-xs">
                                {doc.size} • {formatDate(doc.dateAdded)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="mt-auto pt-3">
                            <div className="flex flex-wrap gap-2 mb-3">
                              {doc.tags.map((tag, index) => (
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
                  ))}
                </div>
              ) : (
                // List View
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {filteredDocuments.map(doc => (
                        <div key={doc.id} className="p-4 flex items-center hover:bg-gray-50">
                          <div className="mr-4">
                            {getDocumentIcon(doc.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium" title={doc.name}>
                                  {doc.name}
                                </h3>
                                <p className="text-gray-500 text-sm">
                                  {doc.category} • {doc.size} • {formatDate(doc.dateAdded)}
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
                              {doc.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Empty State */}
              {filteredDocuments.length === 0 && (
                <div className="text-center py-16 border rounded-lg bg-white">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No documents found</h3>
                  <p className="mt-2 text-gray-500">
                    Try adjusting your search or filters, or upload a new document.
                  </p>
                  <Button className="mt-4">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Document
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Drop Zone */}
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
        </main>
      </div>
    </div>
  );
};

export default Documents;
