import React from 'react';
import { ThemeProvider } from './components/context/theme';
import UserComponent from './components/User';
const App = () => {
  return (
    <ThemeProvider>
      <UserComponent />
    </ThemeProvider>
  );
};

export default App;
