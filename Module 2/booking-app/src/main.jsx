import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './output.css';
import Root from './App.jsx'; // import Root, not App

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
);