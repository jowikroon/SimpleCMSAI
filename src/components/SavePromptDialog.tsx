import React, { useState } from 'react';
import { Save } from 'lucide-react';
import Button from './ui/Button';
import { usePromptStore } from '../lib/store';

interface SavePromptDialogProps {
  onClose: () => void;
}

const SavePromptDialog: React.FC<SavePromptDialogProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const savePrompt = usePromptStore((state) => state.savePrompt);

  const handleSave = () => {
    if (name.trim()) {
      savePrompt(name.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center space-x-2 mb-4">
          <Save className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Save Prompt Template</h3>
        </div>
        
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter template name..."
          className="w-full p-2 rounded-md border border-border bg-muted/50 mb-4 focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        
        <div className="flex justify-end space-x-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name.trim()}>
            Save Template
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SavePromptDialog;