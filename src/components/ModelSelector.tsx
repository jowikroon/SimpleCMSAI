import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Sparkles } from 'lucide-react';
import { AI_MODELS } from '../lib/aiModels';
import Card from './ui/Card';
import SearchInput from './ui/SearchInput';
import FilterButton from './ui/FilterButton';
import ViewToggle from './ui/ViewToggle';
import * as HoverCard from '@radix-ui/react-hover-card';
import * as Tabs from '@radix-ui/react-tabs';

interface ModelSelectorProps {
  selectedModel: string | null;
  onSelect: (modelId: string | null) => void;
}

const filterOptions = [
  { id: 'ecommerce', label: 'E-commerce Focus' },
  { id: 'opensource', label: 'Open Source' },
  { id: 'multilingual', label: 'Multilingual' }
];

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeTab, setActiveTab] = useState('grid');
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  const filteredModels = useMemo(() => {
    return AI_MODELS.filter(model => {
      const matchesSearch = 
        searchQuery === '' ||
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.description.toLowerCase().includes(searchQuery.toLowerCase());

      if (activeFilters.size === 0) return matchesSearch;

      const matchesFilters = Array.from(activeFilters).every(filter => {
        switch (filter) {
          case 'ecommerce':
            return model.strengths.some(s => 
              s.toLowerCase().includes('retail') || 
              s.toLowerCase().includes('commerce')
            );
          case 'opensource':
            return model.name.toLowerCase().includes('llama') || 
                   model.name.toLowerCase().includes('mistral');
          case 'multilingual':
            return model.strengths.some(s => 
              s.toLowerCase().includes('multilingual') || 
              s.toLowerCase().includes('language')
            );
          default:
            return true;
        }
      });

      return matchesSearch && matchesFilters;
    });
  }, [searchQuery, activeFilters]);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(filter)) {
        next.delete(filter);
      } else {
        next.add(filter);
      }
      return next;
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder="Search AI models..."
            isFocused={isSearchFocused}
          />

          <div className="flex gap-3">
            <FilterButton
              activeFilters={activeFilters}
              onToggleFilter={toggleFilter}
              options={filterOptions}
            />
            <ViewToggle
              view={activeTab}
              onViewChange={setActiveTab}
            />
          </div>
        </div>

        <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
          {activeFilters.has('ecommerce') && (
            <Card className="p-4 border-primary/30 bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/20">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Optimized for E-commerce</h3>
                  <p className="text-sm text-muted-foreground">
                    These models are specifically tuned for online retail, product descriptions, and customer service.
                  </p>
                </div>
              </div>
            </Card>
          )}

          <Tabs.Content value="grid" className="mt-6">
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredModels.length > 0 ? (
                  filteredModels.map((model, index) => (
                    <motion.div
                      key={model.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ 
                        duration: 0.3,
                        delay: index * 0.05,
                        type: "spring",
                        bounce: 0.2
                      }}
                    >
                      <Card
                        className={`h-full cursor-pointer transition-all duration-300 hover:shadow-xl ${
                          selectedModel === model.id
                            ? 'border-primary bg-primary/5 scale-105 shadow-lg shadow-primary/10'
                            : 'hover:border-primary/50 hover:bg-primary/5'
                        }`}
                        onClick={() => onSelect(model.id)}
                      >
                        <div className="p-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-3xl animate-float">{model.icon}</span>
                            {selectedModel === model.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="p-1.5 rounded-full bg-primary/20"
                              >
                                <Check className="w-4 h-4 text-primary" />
                              </motion.div>
                            )}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{model.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {model.description}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {model.strengths.slice(0, 3).map((strength, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 text-xs rounded-full bg-secondary/50"
                              >
                                {strength}
                              </span>
                            ))}
                            {model.strengths.length > 3 && (
                              <HoverCard.Root>
                                <HoverCard.Trigger asChild>
                                  <button className="px-2 py-1 text-xs rounded-full bg-secondary/50">
                                    +{model.strengths.length - 3} more
                                  </button>
                                </HoverCard.Trigger>
                                <HoverCard.Portal>
                                  <HoverCard.Content
                                    className="w-64 p-4 rounded-lg bg-popover/95 border border-border
                                      shadow-lg backdrop-blur-sm animate-in fade-in-0 zoom-in-95"
                                    sideOffset={8}
                                  >
                                    <div className="space-y-2">
                                      {model.strengths.slice(3).map((strength, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                          <span className="text-sm">{strength}</span>
                                        </div>
                                      ))}
                                    </div>
                                    <HoverCard.Arrow className="fill-border" />
                                  </HoverCard.Content>
                                </HoverCard.Portal>
                              </HoverCard.Root>
                            )}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full text-center py-12"
                  >
                    <div className="text-muted-foreground">
                      <p className="text-lg font-medium">No models found</p>
                      <p className="text-sm mt-1">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </Tabs.Content>

          <Tabs.Content value="list" className="mt-6">
            <Card className="divide-y divide-border overflow-hidden rounded-xl">
              <AnimatePresence mode="popLayout">
                {filteredModels.map((model, index) => (
                  <motion.div
                    key={model.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => onSelect(model.id)}
                    className={`p-4 cursor-pointer transition-colors ${
                      selectedModel === model.id
                        ? 'bg-primary/5'
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl animate-float">{model.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium truncate">{model.name}</h3>
                          {selectedModel === model.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="p-1 rounded-full bg-primary/20 ml-2 flex-shrink-0"
                            >
                              <Check className="w-4 h-4 text-primary" />
                            </motion.div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {model.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {model.strengths.map((strength, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs rounded-full bg-secondary/50 truncate"
                            >
                              {strength}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ChevronDown className="w-5 h-5 text-muted-foreground transform -rotate-90 flex-shrink-0" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Card>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default ModelSelector;