import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Trash2, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import { useKeywordStore } from '../stores/keywordStore';
import { cn } from '../lib/utils';

const KeywordTracker: React.FC = () => {
  const [newKeyword, setNewKeyword] = useState('');
  const { keywords, addKeyword, removeKeyword } = useKeywordStore();

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newKeyword.trim()) {
      addKeyword(newKeyword.trim());
      setNewKeyword('');
    }
  };

  const getPerformanceIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Keyword Performance</h2>
          <p className="text-sm text-muted-foreground">Track your target keywords and their rankings</p>
        </div>
        <form onSubmit={handleAddKeyword} className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder="Add keyword..."
              className="pl-10 pr-4 py-2 rounded-full bg-muted/50 border border-border
                focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all w-64"
            />
          </div>
          <Button type="submit" disabled={!newKeyword.trim()} size="sm" pill>
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </form>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-12 gap-4 px-4 text-sm text-muted-foreground">
          <div className="col-span-4">Keyword</div>
          <div className="col-span-2 text-center">Position</div>
          <div className="col-span-2 text-center">Change</div>
          <div className="col-span-3 text-center">Volume</div>
          <div className="col-span-1"></div>
        </div>

        <AnimatePresence>
          {keywords.map((keyword, index) => (
            <motion.div
              key={keyword.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "grid grid-cols-12 gap-4 p-4 rounded-lg items-center",
                "hover:bg-muted/50 group transition-colors"
              )}
            >
              <div className="col-span-4 font-medium">{keyword.term}</div>
              <div className="col-span-2 text-center">{keyword.position}</div>
              <div className="col-span-2 flex items-center justify-center gap-2">
                {getPerformanceIcon(keyword.change)}
                <span className={cn(
                  keyword.change > 0 && "text-green-500",
                  keyword.change < 0 && "text-red-500"
                )}>
                  {keyword.change > 0 ? '+' : ''}{keyword.change}
                </span>
              </div>
              <div className="col-span-3 text-center">{keyword.volume.toLocaleString()}</div>
              <div className="col-span-1 text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeKeyword(keyword.id)}
                >
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {keywords.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No keywords added yet. Start tracking your important keywords!
          </div>
        )}
      </div>
    </Card>
  );
};

export default KeywordTracker;