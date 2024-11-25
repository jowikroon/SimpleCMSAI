import React from 'react';
import { Save, Store, CreditCard, Bell, Lock, Palette } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import * as Tabs from '@radix-ui/react-tabs';

const Settings: React.FC = () => {
  const tabs = [
    { id: 'general', label: 'General', icon: Store },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your store preferences</p>
      </div>

      <Tabs.Root defaultValue="general" className="space-y-6">
        <Card className="p-2">
          <Tabs.List className="flex gap-2">
            {tabs.map((tab) => (
              <Tabs.Trigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm
                  data-[state=active]:bg-primary/10 data-[state=active]:text-primary
                  hover:bg-muted/50 transition-colors"
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Card>

        <Tabs.Content value="general" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Store Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Store Name</label>
                <input
                  type="text"
                  defaultValue="My Awesome Store"
                  className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border
                    focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Store URL</label>
                <div className="flex gap-2">
                  <span className="px-4 py-2 rounded-lg bg-muted/50 border border-border text-muted-foreground">
                    https://
                  </span>
                  <input
                    type="text"
                    defaultValue="mystore.com"
                    className="flex-1 px-4 py-2 rounded-lg bg-muted/50 border border-border
                      focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Store Description</label>
                <textarea
                  rows={4}
                  defaultValue="Welcome to our store!"
                  className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border
                    focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  defaultValue="contact@mystore.com"
                  className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border
                    focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  defaultValue="+1 234-567-8901"
                  className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border
                    focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button size="lg" className="gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </Tabs.Content>

        <Tabs.Content value="billing" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
            <div className="space-y-4">
              {/* Add billing content */}
              <p className="text-muted-foreground">Billing settings coming soon...</p>
            </div>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="notifications" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              {/* Add notifications content */}
              <p className="text-muted-foreground">Notification settings coming soon...</p>
            </div>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="security" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
            <div className="space-y-4">
              {/* Add security content */}
              <p className="text-muted-foreground">Security settings coming soon...</p>
            </div>
          </Card>
        </Tabs.Content>

        <Tabs.Content value="appearance" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Theme Settings</h2>
            <div className="space-y-4">
              {/* Add appearance content */}
              <p className="text-muted-foreground">Theme settings coming soon...</p>
            </div>
          </Card>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default Settings;