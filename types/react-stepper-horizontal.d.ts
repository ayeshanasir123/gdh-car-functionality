declare module 'react-stepper-horizontal' {
    import * as React from 'react';
  
    export interface Step {
      title: string;
      href?: string;
      onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
    }
  
    export interface StepperProps {
      steps: Step[];
      activeStep?: number;
      disabledSteps?: number[];
      activeColor?: string;
      completeColor?: string;
      defaultBarColor?: string;
      defaultBorderColor?: string;
      defaultColor?: string;
      size?: number;
      circleFontSize?: number;
      titleFontSize?: number;
      circleTop?: number;
      titleTop?: number;
      completeTitleColor?: string;
      defaultTitleColor?: string;
      completeOpacity?: string;
      activeTitleColor?: string;
      completeBarColor?: string;
      lineMarginOffset?: number;
      defaultOpacity?: string;
      activeOpacity?: string;
      completeBarStyle?: any;
      defaultBarStyle?: any;
    }
  
    const Stepper: React.FC<StepperProps>;
  
    export default Stepper;
  }
  