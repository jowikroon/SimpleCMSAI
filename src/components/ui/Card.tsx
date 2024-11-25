import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({
  className,
  children,
  variant = 'default',
  ...props
}, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'rounded-xl transition-all duration-300',
        {
          'bg-card p-8 shadow-lg hover:shadow-xl hover:shadow-primary/10': 
            variant === 'default',
          'glass-effect border border-border/50 backdrop-blur-xl p-6 shadow-2xl': 
            variant === 'glass'
        },
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = 'Card';

export default Card;