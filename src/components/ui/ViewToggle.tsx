import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';

interface ViewToggleProps {
  view: string;
  onViewChange: (view: string) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <Tabs.Root value={view} onValueChange={onViewChange}>
      <Tabs.List className="flex gap-2 p-1 rounded-lg bg-muted/30 border-2 border-border/50">
        <Tabs.Trigger
          value="grid"
          className="relative p-2.5 rounded-md transition-colors data-[state=active]:text-primary"
        >
          {view === 'grid' && (
            <motion.div
              layoutId="view-toggle-bg"
              className="absolute inset-0 bg-primary/10 rounded-md -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="2" />
            <rect x="14" y="3" width="7" height="7" rx="2" />
            <rect x="3" y="14" width="7" height="7" rx="2" />
            <rect x="14" y="14" width="7" height="7" rx="2" />
          </svg>
        </Tabs.Trigger>
        <Tabs.Trigger
          value="list"
          className="relative p-2.5 rounded-md transition-colors data-[state=active]:text-primary"
        >
          {view === 'list' && (
            <motion.div
              layoutId="view-toggle-bg"
              className="absolute inset-0 bg-primary/10 rounded-md -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
};

export default ViewToggle;