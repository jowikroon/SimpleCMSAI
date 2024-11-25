import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart, 
  Settings,
  ChevronLeft,
  Store
} from 'lucide-react';
import { useLayoutStore } from '../../stores/layoutStore';
import { cn } from '../../lib/utils';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/products', icon: Package, label: 'Products' },
  { path: '/orders', icon: ShoppingCart, label: 'Orders' },
  { path: '/customers', icon: Users, label: 'Customers' },
  { path: '/analytics', icon: BarChart, label: 'Analytics' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

const Sidebar: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useLayoutStore();
  const location = useLocation();

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isSidebarOpen ? 256 : 80,
        transition: { duration: 0.3 }
      }}
      className="fixed left-0 top-0 h-screen bg-card border-r border-border z-40
        hidden lg:block overflow-x-hidden"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-8">
          <motion.div
            animate={{ opacity: isSidebarOpen ? 1 : 0 }}
            className="flex items-center gap-2"
          >
            <Store className="w-8 h-8 text-primary" />
            <span className="font-bold text-xl">ModernCMS</span>
          </motion.div>
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronLeft className={cn(
              "w-5 h-5 transition-transform duration-300",
              !isSidebarOpen && "rotate-180"
            )} />
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                'hover:bg-muted/50',
                isActive && 'bg-primary/10 text-primary hover:bg-primary/20'
              )}
            >
              <item.icon className="w-5 h-5" />
              <motion.span
                animate={{
                  opacity: isSidebarOpen ? 1 : 0,
                  width: isSidebarOpen ? 'auto' : 0
                }}
                className="font-medium"
              >
                {item.label}
              </motion.span>
            </NavLink>
          ))}
        </nav>
      </div>
    </motion.aside>
  );
};

export default Sidebar;