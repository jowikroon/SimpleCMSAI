import React, { useState } from 'react';
import { Search, Filter, ArrowUpDown, MoreHorizontal, Mail, Phone } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Avatar from '@radix-ui/react-avatar';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
  lastOrder: string;
  avatar?: string;
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234-567-8901',
    orders: 12,
    totalSpent: 1234.56,
    status: 'active',
    lastOrder: '2024-03-10',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&q=80'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 234-567-8902',
    orders: 8,
    totalSpent: 876.43,
    status: 'active',
    lastOrder: '2024-03-08',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&q=80'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1 234-567-8903',
    orders: 3,
    totalSpent: 234.12,
    status: 'inactive',
    lastOrder: '2024-02-15'
  }
];

const Customers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const statuses = Array.from(new Set(mockCustomers.map(c => c.status)));

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || customer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Customers', value: '1,234' },
    { label: 'Active Customers', value: '987' },
    { label: 'New This Month', value: '123' },
    { label: 'Retention Rate', value: '85%' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="text-muted-foreground mt-1">Manage your customer relationships</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">{stat.label}</h3>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search customers..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted/50 border border-border
                focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                {selectedStatus ? selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1) : 'All Status'}
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[200px] rounded-lg p-2 bg-popover border border-border shadow-lg
                  animate-in fade-in-0 zoom-in-95 z-50"
                sideOffset={5}
              >
                <DropdownMenu.Item
                  className="px-3 py-2 text-sm rounded-md hover:bg-muted cursor-pointer"
                  onClick={() => setSelectedStatus(null)}
                >
                  All Status
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="my-2 h-px bg-border" />
                {statuses.map((status) => (
                  <DropdownMenu.Item
                    key={status}
                    className="px-3 py-2 text-sm rounded-md hover:bg-muted cursor-pointer"
                    onClick={() => setSelectedStatus(status)}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4">
                  <div className="flex items-center gap-2">
                    Customer
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="text-left py-3 px-4">Contact</th>
                <th className="text-left py-3 px-4">Orders</th>
                <th className="text-left py-3 px-4">Total Spent</th>
                <th className="text-left py-3 px-4">Last Order</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-right py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-border">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar.Root className="w-8 h-8 rounded-full overflow-hidden bg-muted">
                        <Avatar.Image
                          src={customer.avatar}
                          className="w-full h-full object-cover"
                        />
                        <Avatar.Fallback className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-medium">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </Avatar.Fallback>
                      </Avatar.Root>
                      <span className="font-medium">{customer.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{customer.orders}</td>
                  <td className="py-3 px-4">${customer.totalSpent.toFixed(2)}</td>
                  <td className="py-3 px-4">{new Date(customer.lastOrder).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      customer.status === 'active'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-gray-500/10 text-gray-500'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end">
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Portal>
                          <DropdownMenu.Content
                            className="min-w-[160px] rounded-lg p-2 bg-popover border border-border shadow-lg
                              animate-in fade-in-0 zoom-in-95 z-50"
                            sideOffset={5}
                            align="end"
                          >
                            <DropdownMenu.Item
                              className="px-3 py-2 text-sm rounded-md hover:bg-muted cursor-pointer"
                            >
                              View Profile
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                              className="px-3 py-2 text-sm rounded-md hover:bg-muted cursor-pointer"
                            >
                              Edit Details
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator className="my-2 h-px bg-border" />
                            <DropdownMenu.Item
                              className="px-3 py-2 text-sm rounded-md hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                            >
                              Delete
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Portal>
                      </DropdownMenu.Root>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Customers;