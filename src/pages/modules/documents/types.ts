
export interface Document {
  id: string;
  name: string;
  type: string;
  category: string;
  dateAdded: string;
  size: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  count: number;
  color: string;
}

export interface DocumentsState {
  documents: Document[];
  categories: Category[];
  searchQuery: string;
  selectedCategory: string | null;
  viewMode: 'grid' | 'list';
}
