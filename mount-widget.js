// Import React, ReactDOM, and our WidgetDemo component
import React from 'react';
import { createRoot } from 'react-dom/client';
import WidgetDemo from './dist/perukirja-demo-page.js';

// Function to initialize the widget
const initializeWidget = () => {
  // Find the container element
  const container = document.getElementById('perukirja-widget-root');
  
  // Only proceed if the container exists
  if (container) {
    try {
      // Create a React root
      const root = createRoot(container);
      
      // Render the WidgetDemo component
      root.render(React.createElement(WidgetDemo));
      
      console.log('PerukirjaWidget mounted successfully');
    } catch (error) {
      console.error('Error mounting PerukirjaWidget:', error);
    }
  } else {
    console.error('Could not find #perukirja-widget-root element');
  }
};

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeWidget);
} else {
  // DOM already loaded, initialize immediately
  initializeWidget();
}
