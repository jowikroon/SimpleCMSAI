import React from 'react';
import { Brain, MessageSquare, Shield } from 'lucide-react';
import Button from './ui/Button';
import Card from './ui/Card';
import StepIndicator from './StepIndicator';
import StepContent from './ui/StepContent';
import { usePromptStore } from '../lib/store';
import { motion } from 'framer-motion';
import { AI_MODELS } from '../lib/aiModels';

const commonSteps = [
  {
    title: 'Role & Personality',
    description: 'Define the core personality and role',
    field: 'personality',
    options: [
      { id: 'expert', label: 'Expert', description: 'Deep technical knowledge and professional approach', icon: '👨‍💼' },
      { id: 'mentor', label: 'Mentor', description: 'Patient, educational, and supportive', icon: '👨‍🏫' },
      { id: 'creative', label: 'Creative', description: 'Innovative and out-of-the-box thinking', icon: '🎨' },
      { id: 'analyst', label: 'Analyst', description: 'Detail-oriented and analytical approach', icon: '📊' },
      { id: 'strategist', label: 'Strategist', description: 'Focus on long-term planning and optimization', icon: '🎯' },
      { id: 'collaborator', label: 'Collaborator', description: 'Team-oriented and cooperative', icon: '🤝' }
    ],
    validation: (value: string[]) => value.length > 0,
    errorMessage: 'Please select at least one personality trait',
    Icon: Brain
  },
  {
    title: 'Communication Style',
    description: 'How should the AI communicate?',
    field: 'communication',
    options: [
      { id: 'concise', label: 'Concise', description: 'Brief and to-the-point responses', icon: '📝' },
      { id: 'detailed', label: 'Detailed', description: 'Comprehensive explanations', icon: '📚' },
      { id: 'technical', label: 'Technical', description: 'Using technical terminology', icon: '💻' },
      { id: 'simple', label: 'Simple', description: 'Easy to understand language', icon: '🎯' },
      { id: 'formal', label: 'Formal', description: 'Professional and structured', icon: '👔' },
      { id: 'casual', label: 'Casual', description: 'Friendly and conversational', icon: '🗣️' }
    ],
    validation: (value: string[]) => value.length === 1,
    errorMessage: 'Please select one communication style',
    Icon: MessageSquare,
    singleSelect: true
  },
  {
    title: 'Behavioral Guidelines',
    description: 'Set interaction boundaries',
    field: 'constraints',
    options: [
      { id: 'verify', label: 'Verify Sources', description: 'Always cite and verify information', icon: '✅' },
      { id: 'privacy', label: 'Privacy First', description: 'Never share personal information', icon: '🔒' },
      { id: 'ethical', label: 'Ethical Conduct', description: 'Follow ethical guidelines', icon: '⚖️' },
      { id: 'transparent', label: 'Transparency', description: 'Be clear about limitations', icon: '🔍' },
      { id: 'professional', label: 'Professional Tone', description: 'Maintain professional demeanor', icon: '👔' },
      { id: 'inclusive', label: 'Inclusivity', description: 'Use inclusive language', icon: '🤝' }
    ],
    validation: (value: string[]) => value.length > 0,
    errorMessage: 'Please select at least one guideline',
    Icon: Shield
  }
];

const PromptBuilder: React.FC = () => {
  const { formData, currentStep, setCurrentStep, updateField, updateModelField } = usePromptStore();

  const selectedModel = AI_MODELS.find(model => model.id === formData.selectedModel);
  const steps = selectedModel 
    ? [...selectedModel.steps, ...commonSteps]
    : commonSteps;

  const isStepComplete = (stepIndex: number) => {
    const step = steps[stepIndex];
    if (stepIndex < (selectedModel?.steps.length || 0)) {
      return step.validation(formData.modelSpecific[step.field] || []);
    }
    return step.validation(formData[step.field as keyof typeof formData] || []);
  };

  const handleNext = () => {
    if (currentStep < steps.length && isStepComplete(currentStep - 1)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleOptionSelect = (field: string, optionId: string, singleSelect?: boolean) => {
    const isModelSpecificStep = currentStep <= (selectedModel?.steps.length || 0);
    const currentValue = isModelSpecificStep
      ? (formData.modelSpecific[field] || [])
      : (formData[field as keyof typeof formData] || []) as string[];

    let newValue: string[];

    if (singleSelect) {
      newValue = [optionId];
    } else {
      newValue = currentValue.includes(optionId)
        ? currentValue.filter(id => id !== optionId)
        : [...currentValue, optionId];
    }

    if (isModelSpecificStep) {
      updateModelField(field, newValue);
    } else {
      updateField(field as keyof typeof formData, newValue);
    }
  };

  const currentStepData = steps[currentStep - 1];
  const StepIcon = currentStepData.Icon;

  return (
    <Card variant="glass">
      <StepIndicator
        currentStep={currentStep}
        totalSteps={steps.length}
        completedSteps={steps.map((_, index) => isStepComplete(index))}
      />

      <div className="space-y-6">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-start space-x-3"
        >
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <StepIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1">
              {currentStepData.title}
            </h3>
            <p className="text-muted-foreground">
              {currentStepData.description}
            </p>
          </div>
        </motion.div>

        <StepContent
          currentStep={currentStep}
          options={currentStepData.options}
          field={currentStepData.field}
          selectedValues={
            currentStep <= (selectedModel?.steps.length || 0)
              ? formData.modelSpecific[currentStepData.field] || []
              : (formData[currentStepData.field as keyof typeof formData] || []) as string[]
          }
          onOptionSelect={handleOptionSelect}
          singleSelect={currentStepData.singleSelect}
          isValid={isStepComplete(currentStep - 1)}
          errorMessage={currentStepData.errorMessage}
        />

        <motion.div
          className="flex justify-between pt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="secondary"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="group"
          >
            Back
          </Button>
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={currentStep === steps.length || !isStepComplete(currentStep - 1)}
            className="group"
          >
            {currentStep === steps.length ? 'Complete' : 'Next'}
          </Button>
        </motion.div>
      </div>
    </Card>
  );
};

export default PromptBuilder;