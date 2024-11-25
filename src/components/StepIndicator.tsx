import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  completedSteps: boolean[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep, 
  totalSteps,
  completedSteps 
}) => {
  return (
    <div className="relative mb-16">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={cn(
              'relative z-10 flex flex-col items-center gap-2',
              'transition-all duration-300 ease-in-out',
              {
                'scale-110': currentStep === index + 1,
              }
            )}
          >
            <motion.div
              className={cn(
                'flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300',
                'border-2 shadow-lg backdrop-blur-sm',
                {
                  'border-primary bg-primary/20 text-primary neon-border': 
                    currentStep === index + 1,
                  'border-secondary bg-secondary/20 text-secondary': 
                    completedSteps[index],
                  'border-muted bg-muted/20 text-muted-foreground': 
                    !completedSteps[index] && currentStep !== index + 1,
                }
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {completedSteps[index] ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <CheckCircle2 className="w-8 h-8" />
                </motion.div>
              ) : (
                <motion.span 
                  className="text-2xl font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {index + 1}
                </motion.span>
              )}
            </motion.div>
            <motion.div
              className="absolute -bottom-8 w-max"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <span
                className={cn(
                  'text-sm font-medium transition-all duration-300',
                  {
                    'text-primary scale-105': currentStep === index + 1,
                    'text-secondary': completedSteps[index],
                    'text-muted-foreground': !completedSteps[index] && currentStep !== index + 1,
                  }
                )}
              >
                Step {index + 1}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute top-7 left-0 w-full h-1 bg-muted -z-10 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-accent to-secondary"
          initial={{ width: 0 }}
          animate={{ 
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Floating progress indicator */}
      <motion.div
        className="absolute -top-8 left-0 text-sm font-medium text-primary"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          left: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
        }}
        transition={{ duration: 0.5 }}
        style={{
          transform: 'translateX(-50%)',
        }}
      >
        {Math.round((currentStep / totalSteps) * 100)}%
      </motion.div>
    </div>
  );
};

export default StepIndicator;