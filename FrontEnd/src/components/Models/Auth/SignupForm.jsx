import { useNavigate } from "react-router-dom";
import { useAuthSignupSteps } from "../../../hooks/auth/useAuthSignupSteps";
import ProgressBar from "../../Shared/Bars/ProgressBar";
import InputStep from "../../Shared/InputStep";
import NavigationButtons from "../../Shared/NavigationButtons";

export default function SignupForm({ setError }) {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate("/");
  }

  const {
    stepIndex,
    formData,
    steps,
    currentStep,
    isLast,
    isCompleted,
    handleChange,
    prevStep,
    handleNext,
    handleSubmit,
  } = useAuthSignupSteps(onSubmit, setError);

  const totalSteps = steps.length;
  const progressPercent = (stepIndex / (totalSteps - 1)) * 100;
  
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (isLast) {
          handleSubmit();
        } else {
          handleNext();
        }
      }}
      className="space-y-6"
    >
      {currentStep ? (
        <InputStep
          step={currentStep}
          data={formData}
          onChange={handleChange}
          onEnter={() => {
            if (isLast) {
              handleSubmit();
            } else {
              handleNext();
            }
          }}
        />
      ) : (
        <div>Chargement...</div>
      )}


      <ProgressBar progress={progressPercent} hasFinished={isLast && isCompleted} />
      <div className="h-2" />

      <NavigationButtons
        isFirst={stepIndex === 0}
        hasFinished={isLast && isCompleted}
        onPrev={prevStep}
        onNext={isLast ? handleSubmit : handleNext}
        disabledNext={!currentStep}
      />
    </form>
  );
};