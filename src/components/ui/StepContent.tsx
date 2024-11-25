import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield } from 'lucide-react';
import OptionCard from './OptionCard';

interface Option {
  id: string;
  label: string;
  description: string;
  icon: string;
}

interface StepContentProps {
  currentStep: number;
  options: Option[];
  field: string;
  selectedValues: string[];
  onOptionSelect: (field: string, optionId: string, singleSelect?: boolean) => void;
  singleSelect?: boolean;
  isValid: boolean;
  errorMessage: string;
}

const StepContent = React.forwardRef<HTMLDivElement, StepContentProps>(({
  currentStep,
  options,
  field,
  selectedValues,
  onOptionSelect,
  singleSelect,
  isValid,
  errorMessage
}, ref) => {
  return (
    <div ref={ref}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4"
        >
          {options.map((option, index) => (
            <OptionCard
              key={option.id}
              {...option}
              index={index}
              isSelected={selectedValues.includes(option.id)}
              onClick={() => onOptionSelect(field, option.id, singleSelect)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {!isValid && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-destructive text-sm flex items-center gap-2 mt-2"
          >
            <Shield className="w-4 h-4" />
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

StepContent.displayName = 'StepContent';

export default StepContent;