// components/ui/progress-indicator.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Stepper from 'react-stepper-horizontal';
import '../../app/flights-styles/progressIndicator-styles.css'
interface Step {
  title: string;
  href: string;
}

const ProgressIndicator: React.FC = () => {
  const pathname = usePathname();

  const [steps] = useState<Step[]>([
    { title: 'Flight Details', href: '/flights/search-results/flights-search-results-details'},
    { title: 'Payment', href: '/flights/search-results/flights-search-payment-details' },
    { title: 'Flight Confirmation', href: '/flights/search-results/flights-search-booking-confirmation' },
  ]);

  const getCurrentStep = () => {
    return steps.findIndex(step => step.href === pathname);
  };

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    setCurrentStep(getCurrentStep());
  }, [pathname]);

  return (
    <div className="mt-2 p-4 Step-titleFontSize stepper-container">
    <Stepper
      activeColor="#10294D"
      completeColor="#CDCDCD"
      defaultColor="#CDCDCD"
      activeTitleColor="#10294D"
      defaultTitleColor="#CDCDCD"
      completeTitleColor="#CDCDCD"
      steps={steps} 
      activeStep={currentStep}
      />
    </div>
  );
};

export default ProgressIndicator;
