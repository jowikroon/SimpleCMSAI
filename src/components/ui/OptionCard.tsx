import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import * as HoverCard from '@radix-ui/react-hover-card';

interface OptionCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  id: string;
  label: string;
  description: string;
  icon: string;
  isSelected: boolean;
  index: number;
}

const OptionCard = React.forwardRef<HTMLButtonElement, OptionCardProps>(({
  label,
  description,
  icon,
  isSelected,
  index,
  className,
  ...props
}, ref) => {
  return (
    <HoverCard.Root openDelay={200} closeDelay={100}>
      <HoverCard.Trigger asChild>
        <motion.button
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: isSelected ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            'w-full p-6 rounded-2xl border-2 text-left transition-all duration-300',
            'hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50',
            'transform-gpu backface-hidden group',
            isSelected
              ? 'border-primary bg-primary/20 text-primary scale-105 neon-border'
              : 'border-border hover:border-primary/50 hover:bg-primary/5',
            className
          )}
          {...props}
        >
          <div className="flex items-start space-x-4">
            <span className="text-3xl group-hover:scale-110 transition-transform duration-300 animate-float">
              {icon}
            </span>
            <div className="space-y-2">
              <div className="font-medium text-lg">{label}</div>
              <div className="text-sm text-muted-foreground line-clamp-2">
                {description}
              </div>
            </div>
          </div>
        </motion.button>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="w-80 p-4 rounded-xl bg-popover border border-border shadow-xl
            animate-in fade-in-0 zoom-in-95 z-50"
          sideOffset={8}
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{icon}</span>
              <h4 className="font-semibold">{label}</h4>
            </div>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>
          <HoverCard.Arrow className="fill-popover" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
});

OptionCard.displayName = 'OptionCard';

export default OptionCard;