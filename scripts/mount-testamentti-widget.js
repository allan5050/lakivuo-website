// Import React, ReactDOM, and our TestamenttiLeadWidget component
import React from 'react';
import { createRoot } from 'react-dom/client';
// Adjust the path based on your build output directory if needed
import TestamenttiLeadWidget from '../dist/components/testamentti-lead-widget.js'; // Corrected path

// Function to initialize the widget
const initializeTestamenttiWidget = () => {
  // Find the container element
  const container = document.getElementById('testamentti-lead-widget-root');
  
  if (container) {
    try {
      const root = createRoot(container);
      root.render(React.createElement(TestamenttiLeadWidget));
      console.log('TestamenttiLeadWidget mounted successfully');
    } catch (error) {
      console.error('Error mounting TestamenttiLeadWidget:', error);
    }
  } else {
    console.warn('Could not find #testamentti-lead-widget-root element on this page.');
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTestamenttiWidget);
} else {
  initializeTestamenttiWidget();
}