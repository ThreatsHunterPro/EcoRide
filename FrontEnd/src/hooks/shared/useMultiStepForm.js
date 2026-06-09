import { useState } from "react";

export function useMultiStepForm(initialSteps = [], initialData = {}, onSubmit, setError) {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState(initialData);

  const steps = initialSteps;
  const currentStep = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  const handleChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const prevStep = () => {
    if (stepIndex > 0) setStepIndex((prev) => prev - 1);
  };

  const nextStep = () => {
    if (!isLast) setStepIndex((prev) => prev + 1);
  };

  const isEmpty = (val) => val === undefined || val === null || (typeof val === "string" && val.trim() === "");

  const validateCurrentStep = async () => {
    if (!currentStep || !currentStep.fields) return null;

    for (const field of currentStep.fields) {
      const value = formData[field.name];

      const isRequired = field.required ?? currentStep.fields.length === 1;

      if (isRequired && isEmpty(value)) {
        return `${field.placeholder} requis !`;
      }

      if (field.validation) {
        const fieldError = await field.validation(value);
        if (fieldError) return fieldError;    
      }
    }

    return null;
  };

  const handleNext = async () => {
    const validationError = await validateCurrentStep();
    if (validationError) {
      setError(validationError);  
      return false;    
    }

    setError(null);
    nextStep();
    return true;  
  };

  const handleSubmit = async () => {
    const validationError = await validateCurrentStep();
    
    if (validationError) {
      console.log("Validation échouée :", validationError);
      setError(validationError);
      return;
    }

    setError(null);

    if (!isLast) {
      handleNext();
      return;
    }

    try {
      if (onSubmit) await onSubmit(formData);
    } 
    catch (err) {
      setError(err?.message || "Une erreur inconnue est survenue");
    }
  };

  return {
    stepIndex,
    formData,
    steps,
    currentStep,
    isLast,
    setFormData,
    handleChange,
    prevStep,
    nextStep,
    validateCurrentStep,
    handleNext,
    handleSubmit,
  };
}
