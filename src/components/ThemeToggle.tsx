import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';
import Button from './ui/Button';
import Tooltip from './ui/Tooltip';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Tooltip
      content={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      side="bottom"
    >
      <Button
        variant="ghost"
        size="sm"
        className="w-9 h-9 p-0"
        onClick={toggleTheme}
      >
        {theme === 'light' ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
      </Button>
    </Tooltip>
  );
};

export default ThemeToggle;