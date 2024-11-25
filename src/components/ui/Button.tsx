import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  pill?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  pill = false,
  children,
  disabled,
  ...props
}, ref) => {
  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={cn(
        'font-medium transition-all duration-300',
        'inline-flex items-center justify-center gap-2',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'focus:ring-offset-background disabled:opacity-50',
        'hover:shadow-lg hover:shadow-primary/10 active:shadow-none',
        'transform-gpu backface-hidden',
        {
          'bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground hover:opacity-90 neon-glow':
            variant === 'primary',
          'bg-secondary/90 text-secondary-foreground hover:bg-secondary':
            variant === 'secondary',
          'border-2 border-primary bg-transparent text-primary hover:bg-primary/10 neon-border':
            variant === 'outline',
          'bg-transparent text-foreground hover:bg-muted':
            variant === 'ghost',
        },
        {
          'px-4 py-2 text-sm': size === 'sm',
          'px-6 py-2.5': size === 'md',
          'px-8 py-3 text-lg': size === 'lg',
        },
        pill ? 'rounded-full' : 'rounded-lg',
        'disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100',
        loading && 'relative !text-transparent hover:!text-transparent cursor-wait',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {children}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-5 h-5 border-3 border-primary/30 border-t-primary rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;