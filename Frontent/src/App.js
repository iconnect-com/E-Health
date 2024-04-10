import React from 'react';
import RoutesWrapper from './routes';
import ThemeProvider from './theme';

function App() {
  return (
    <ThemeProvider>
      <RoutesWrapper />
    </ThemeProvider>
  );
}

export default App;
