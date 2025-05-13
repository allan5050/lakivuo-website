// Import React, ReactDOM, and our PerukirjaLeadWidget component
import React from 'react';
import { createRoot } from 'react-dom/client';
// Adjust the path based on your build output directory if needed
import PerukirjaLeadWidget from './dist/perukirja-lead-widget.js'; // Or directly './perukirja-lead-widget.js' if you use TS->JS in same dir

// Function to initialize the widget
const initializeLeadWidget = () => {
  // Find the container element
  const container = document.getElementById('perukirja-lead-widget-root');
  
  // Only proceed if the container exists
  if (container) {
    try {
      // Create a React root
      const root = createRoot(container);
      
      // Render the PerukirjaLeadWidget component
      root.render(React.createElement(PerukirjaLeadWidget));
      
      console.log('PerukirjaLeadWidget mounted successfully');
    } catch (error) {
      console.error('Error mounting PerukirjaLeadWidget:', error);
    }
  } else {
    console.warn('Could not find #perukirja-lead-widget-root element on this page.');
  }
};

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeLeadWidget);
} else {
  // DOM already loaded, initialize immediately
  initializeLeadWidget();
}