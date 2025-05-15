
import { Document, Category } from '../types';

// Mock data for documents
export const documents: Document[] = [
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
export const categories: Category[] = [
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
