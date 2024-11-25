import React from 'react';
import { Book, Trash2, Clock, Download } from 'lucide-react';
import { usePromptStore } from '../lib/store';
import Button from './ui/Button';
import Card from './ui/Card';

const SavedPrompts: React.FC = () => {
  const { savedPrompts, loadPrompt, deletePrompt } = usePromptStore();

  if (!savedPrompts?.length) {
    return null;
  }

  return (
    <Card variant="glass" className="mt-8">
      <div className="flex items-center space-x-2 mb-4">
        <Book className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Saved Templates</h3>
      </div>

      <div className="space-y-3">
        {savedPrompts.map((prompt) => (
          <div
            key={prompt.id}
            className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted/30 transition-colors"
          >
            <div>
              <h4 className="font-medium">{prompt.name}</h4>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                <Clock className="w-4 h-4" />
                <span>
                  {new Date(prompt.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => loadPrompt(prompt.id)}
              >
                Load
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deletePrompt(prompt.id)}
              >
                <Trash2 className="w-4 h-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SavedPrompts;