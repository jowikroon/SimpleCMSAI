import React from 'react';
import { Filter, Check } from 'lucide-react';
import * as Popover from '@radix-ui/react-popover';
import Button from './Button';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterOption {
  id: string;
  label: string;
}

interface FilterButtonProps {
  activeFilters: Set<string>;
  onToggleFilter: (filter: string) => void;
  options: FilterOption[];
}

const FilterButton: React.FC<FilterButtonProps> = ({
  activeFilters,
  onToggleFilter,
  options
}) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button 
          variant="outline" 
          className="gap-2 relative group px-4 py-2.5"
          size="lg"
        >
          <Filter className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
          <span>Filters</span>
          {activeFilters.size > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-1 px-2 py-0.5 text-xs font-medium rounded-full bg-primary text-primary-foreground"
            >
              {activeFilters.size}
            </motion.span>
          )}
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="w-64 p-3 rounded-xl bg-popover/95 border-2 border-border/50 shadow-2xl
            backdrop-blur-sm animate-in fade-in-0 zoom-in-95 z-50"
          sideOffset={8}
        >
          <div className="space-y-1">
            {options.map((option) => (
              <motion.button
                key={option.id}
                onClick={() => onToggleFilter(option.id)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg
                  hover:bg-primary/10 transition-colors group"
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-medium group-hover:text-primary transition-colors">
                  {option.label}
                </span>
                <AnimatePresence>
                  {activeFilters.has(option.id) && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="p-1 rounded-full bg-primary/20"
                    >
                      <Check className="w-3 h-3 text-primary" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
          <Popover.Arrow className="fill-border" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default FilterButton;