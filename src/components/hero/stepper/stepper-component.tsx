import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Stepper from "react-stepper-horizontal";
import "./stepper-styles.css";

interface Step {
  title: string;
  href: string;
}

interface StepperComponentProps {
  steps: Step[];
}

const StepperComponent: React.FC<StepperComponentProps> = ({ steps }) => {
  const pathname = usePathname();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const getCurrentStep = () => {
      return steps.findIndex((step) => step.href === pathname);
    };
    setCurrentStep(getCurrentStep());
  }, [pathname, steps]);

  return (
    <div className="Step-titleFontSize stepper-container mt-2 p-4">
      <Stepper
        steps={steps}
        activeStep={currentStep}
        activeColor="#10294D"
        completeColor="#CDCDCD"
        defaultColor="#CDCDCD"
        activeTitleColor="#10294D"
        defaultTitleColor="#CDCDCD"
        completeTitleColor="#CDCDCD"
      />
    </div>
  );
};

export default StepperComponent;
