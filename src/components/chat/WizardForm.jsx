import { useState } from "react";
import Step1TeamComposition from "./wizard/Step1TeamComposition";
import Step2PreviousExperience from "./wizard/Step2PreviousExperience";
import Step3TechnicalScope from "./wizard/Step3TechnicalScope";
import Step4CreativeDirection from "./wizard/Step4CreativeDirection";
import Step5BusinessGoals from "./wizard/Step5BusinessGoals";
import Step6TargetAudience from "./wizard/Step6TargetAudience";
import Step7RiskFlexibility from "./wizard/Step7RiskFlexibility";
import Step8CommunityPresence from "./wizard/Step8CommunityPresence";
import "./WizardForm.css";

const TOTAL_STEPS = 8;

function WizardForm({ onSubmit, onCancel }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    teamSize: "",
    teamMembers: [],
    // Step 2
    releasedGamesCount: "",
    releasePlatforms: [],
    genresReleased: [],
    previousProjectProblems: "",
    // Step 3
    gameDimension: "",
    gameEngine: "",
    gameMode: "",
    onlineSystemRequired: false,
    // Step 4
    preferredGenres: [],
    themePreferences: [],
    visualStyle: "",
    artHeavyLevel: "",
    // Step 5
    projectGoalType: "",
    targetPriceRange: "",
    maxDevelopmentTime: "",
    targetReleaseWindow: "",
    primaryObjective: "",
    revenueExpected: { min: "", max: "" },
    // Step 6
    targetAgeGroup: { min: "", max: "" },
    playerType: "",
    targetRegion: "",
    platformFocus: [],
    // Step 7
    pivotReadiness: "",
    releaseDelayReadiness: "",
    // Step 8
    communityChannels: [],
  });

  const updateFormData = (stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1TeamComposition
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <Step2PreviousExperience
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <Step3TechnicalScope
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <Step4CreativeDirection
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onSkip={handleNext}
          />
        );
      case 5:
        return (
          <Step5BusinessGoals
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 6:
        return (
          <Step6TargetAudience
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 7:
        return (
          <Step7RiskFlexibility
            data={formData}
            onUpdate={updateFormData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 8:
        return (
          <Step8CommunityPresence
            data={formData}
            onUpdate={updateFormData}
            onSubmit={handleSubmit}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="wizard-form">
      <div className="wizard-header">
        <h2>Project Analysis Form</h2>
        <div className="wizard-progress">
          <span className="progress-text">
            Step {currentStep} of {TOTAL_STEPS}
          </span>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            />
          </div>
        </div>
      </div>
      <div className="wizard-content">{renderStep()}</div>
    </div>
  );
}

export default WizardForm;

