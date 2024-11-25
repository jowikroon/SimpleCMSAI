import React, { useState } from 'react';
import { Plus, Search, Filter, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: 'active' | 'draft' | 'archived';
  image: string;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    stock: 45,
    category: 'Electronics',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80'
  },
  {
    id: '2',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    stock: 120,
    category: 'Apparel',
    status: 'active',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80'
  },
  {
    id: '3',
    name: 'Smart Watch Series X',
    price: 299.99,
    stock: 15,
    category: 'Electronics',
    status: 'draft',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&q=80'
  }
];

const Products: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(mockProducts.map(p => p.category)));

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: Product['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500';
      case 'draft':
        return 'bg-yellow-500/10 text-yellow-500';
      case 'archived':
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your product catalog</p>
        </div>
        <Button size="lg" className="gap-2">
          <Plus className="w-5 h-5" />
          Add Product
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-muted/50 border border-border
                focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                {selectedCategory || 'All Categories'}
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
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="my-2 h-px bg-border" />
                {categories.map((category) => (
                  <DropdownMenu.Item
                    key={category}
                    className="px-3 py-2 text-sm rounded-md hover:bg-muted cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
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
                    Product
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-left py-3 px-4">Price</th>
                <th className="text-left py-3 px-4">Stock</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-right py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-border">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                  <td className="py-3 px-4">{product.stock}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {product.status}
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
                              Edit
                            </DropdownMenu.Item>
                            <DropdownMenu.Item
                              className="px-3 py-2 text-sm rounded-md hover:bg-muted cursor-pointer"
                            >
                              Duplicate
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

export default Products;