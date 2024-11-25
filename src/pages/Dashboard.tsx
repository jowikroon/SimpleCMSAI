import React from 'react';
import { BarChart3, DollarSign, ShoppingCart, Users } from 'lucide-react';
import Card from '../components/ui/Card';
import ModelSelector from '../components/ModelSelector';
import { usePromptStore } from '../lib/store';
import PromptBuilder from '../components/PromptBuilder';
import Preview from '../components/Preview';
import KeywordTracker from '../components/KeywordTracker';

const Dashboard: React.FC = () => {
  const { formData, setSelectedModel } = usePromptStore();

  const stats = [
    { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: DollarSign },
    { title: 'Orders', value: '356', change: '+12.5%', icon: ShoppingCart },
    { title: 'Customers', value: '2,345', change: '+18.2%', icon: Users },
    { title: 'Conversion Rate', value: '3.2%', change: '+4.3%', icon: BarChart3 }
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h2 className="text-2xl font-bold mt-1">{stat.value}</h2>
              </div>
              <div className="p-3 rounded-full bg-primary/10">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-sm text-primary mt-4">{stat.change} from last month</p>
          </Card>
        ))}
      </div>

      <KeywordTracker />

      <div className="space-y-8">
        <ModelSelector
          selectedModel={formData.selectedModel}
          onSelect={setSelectedModel}
        />

        {formData.selectedModel && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PromptBuilder />
            <Preview />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;