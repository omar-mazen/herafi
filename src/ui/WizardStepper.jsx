import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Button from "./Button";
import LineLoader from "./LineLoader";

const stepperContext = createContext();

export default function WizardStepper({ children, onSubmit }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const previous = () => {
    setCurrentStep((step) => (step > 0 ? step - 1 : step));
  };
  const next = () => {
    setCurrentStep((step) => {
      return step < totalSteps ? step + 1 : step;
    });
  };
  const finish = () => setCurrentStep(null);
  if (currentStep == null) return;
  return (
    <stepperContext.Provider
      value={{
        totalSteps,
        setTotalSteps,
        currentStep,
        previous,
        next,
        finish,
        onSubmit,
      }}
    >
      {children}
    </stepperContext.Provider>
  );
}
function useStepper() {
  const {
    totalSteps,
    setTotalSteps,
    currentStep,
    previous,
    next,
    finish,
    onSubmit,
  } = useContext(stepperContext);
  return {
    totalSteps,
    setTotalSteps,
    currentStep,
    previous,
    next,
    finish,
    onSubmit,
  };
}
function Previous({ isLoading }) {
  const { previous, currentStep } = useStepper();
  return (
    <Button onClick={previous} disabled={currentStep == 0 || isLoading}>
      السابق
    </Button>
  );
}
function Next({ isLoading, isNextButtonEnabled, onClick }) {
  return (
    <Button
      onClick={() => {
        onClick?.();
      }}
      disabled={isLoading || !isNextButtonEnabled}
    >
      التالي
    </Button>
  );
}
function Submit() {
  const { finish, onSubmit } = useStepper();
  return (
    <Button
      onClick={() => {
        onSubmit?.();
        finish();
      }}
    >
      إنهاء
    </Button>
  );
}
function StepList({ children }) {
  const { currentStep, setTotalSteps } = useStepper();
  const validChildren = children.filter((child) => child);

  useEffect(() => {
    setTotalSteps(validChildren.length - 1);
  }, [validChildren]);
  return validChildren?.map((child, index) =>
    cloneElement(child, { key: index, isActive: index == currentStep }),
  );
}
function Step({
  children,
  isActive,
  isLoading,
  isSuccess,
  isNextButtonEnabled,
  onNext,
}) {
  const { currentStep, totalSteps, next } = useStepper();
  if (!isActive) return;
  return (
    <div className="container relative grid h-full w-full grid-rows-[1fr,8rem] overflow-y-auto overflow-x-hidden">
      {isLoading && (
        <div className=" absolute left-0 top-0 h-fit w-full">
          <LineLoader />
        </div>
      )}
      <div className="h-full w-full ">{children}</div>
      <div
        style={{ filter: "drop-shadow(rgba(0,0,0,0.3) 0px 0px 6px)" }}
        className=" container fixed bottom-0 flex h-24 w-full items-center justify-between border-t border-primary-color/50 bg-secondary-background"
      >
        <Previous disabled={isLoading} />
        {totalSteps != currentStep ? (
          <Next
            isLoading={isLoading}
            isNextButtonEnabled={isNextButtonEnabled}
            onClick={() => {
              onNext?.();
              next();
            }}
          />
        ) : (
          <Submit />
        )}
      </div>
    </div>
  );
}

WizardStepper.StepList = StepList;
WizardStepper.Step = Step;
