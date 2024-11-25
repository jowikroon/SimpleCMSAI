import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';
import AppLayout from './layouts/AppLayout';
import AppRoutes from './routes';
import { useThemeStore } from './stores/themeStore';

const App: React.FC = () => {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <Router>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
      <Toaster 
        position="top-right" 
        expand={false} 
        richColors 
        closeButton
        theme={theme}
      />
    </Router>
  );
};

export default App;