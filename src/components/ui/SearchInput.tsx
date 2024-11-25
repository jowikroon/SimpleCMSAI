import React from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  placeholder?: string;
  isFocused: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder = "Search...",
  isFocused
}) => {
  return (
    <motion.div 
      className="relative flex-1 group"
      animate={{ scale: isFocused ? 1.02 : 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute left-3 top-1/2 -translate-y-1/2 transition-transform duration-200 group-focus-within:scale-110">
        <Search className="w-4 h-4 text-muted-foreground" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        className="w-full pl-10 pr-12 py-3 rounded-xl bg-muted/30 border-2 border-border/50
          focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/10
          transition-all duration-300 placeholder:text-muted-foreground/70"
      />
      {value && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full
            hover:bg-primary/10 transition-colors group"
        >
          <X className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.button>
      )}
    </motion.div>
  );
};

export default SearchInput;