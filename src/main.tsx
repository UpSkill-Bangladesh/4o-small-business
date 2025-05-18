
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css'; // Updated import path
import { ThemeProvider } from './hooks/use-theme.tsx';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="nyc-smb-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
