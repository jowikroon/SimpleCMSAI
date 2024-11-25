import React, { useState } from 'react';
import { Cpu, Copy, Download, CheckCircle2, Save } from 'lucide-react';
import Card from './ui/Card';
import Button from './ui/Button';
import { usePromptStore } from '../lib/store';
import { generatePrompt } from '../lib/utils';
import SavePromptDialog from './SavePromptDialog';

const Preview: React.FC = () => {
  const { formData } = usePromptStore();
  const [copied, setCopied] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const promptText = generatePrompt(formData);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadPrompt = () => {
    const blob = new Blob([promptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-prompt.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Card variant="glass">
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Cpu className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Generated Prompt</h3>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSaveDialog(true)}
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="group"
              >
                {copied ? (
                  <CheckCircle2 className="w-4 h-4 mr-2 text-secondary" />
                ) : (
                  <Copy className="w-4 h-4 mr-2 group-hover:text-primary" />
                )}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              <Button variant="outline" size="sm" onClick={downloadPrompt}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap text-sm font-mono bg-muted/50 p-4 rounded-lg border border-border overflow-auto">
              {promptText || "Start building your prompt using the form..."}
            </pre>
          </div>

          <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
            <h4 className="text-sm font-medium text-accent-foreground mb-2">Pro Tips:</h4>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span>Be specific about desired expertise and knowledge areas</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span>Define clear communication preferences</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span>Include relevant context for better responses</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span>Set explicit behavioral constraints</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {showSaveDialog && (
        <SavePromptDialog onClose={() => setShowSaveDialog(false)} />
      )}
    </>
  );
};

export default Preview;