
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";

const EmptyState: React.FC = () => {
  return (
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
  );
};

export default EmptyState;
