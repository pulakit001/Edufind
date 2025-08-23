import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormStep } from "@/components/FormStep";
import { CollegeRecommendations } from "@/components/CollegeRecommendations";
import { useToast } from "@/hooks/use-toast";

export interface FormData {
  educationLevel: string;
  academicStream: string;
  specificMajors: string[];
  programPreference: string;
  location: {
    country: string;
    state: string;
    city: string;
    freeText: string;
  };
  budget: {
    min: number;
    max: number;
    selected: number;
  };
  collegeType: string[];
  exams: Array<{ name: string; score: string }>;
  dreamCollegeDescription: string;
  additionalInfo: string;
}

const initialFormData: FormData = {
  educationLevel: '',
  academicStream: '',
  specificMajors: [],
  programPreference: '',
  location: {
    country: '',
    state: '',
    city: '',
    freeText: ''
  },
  budget: {
    min: 50000,
    max: 3000000,
    selected: 650000
  },
  collegeType: [],
  exams: [],
  dreamCollegeDescription: '',
  additionalInfo: ''
};

export function CollegeFinderForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const totalSteps = 10;

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const generateAIPrompt = (data: FormData): string => {
    return `You are "AdmissionsSense" — an expert global university admissions consultant, career advisor, and data analyst. Based on the following user preferences, recommend the top 10 colleges that best match. Provide reasoning, fit scores, and suggested next steps.

Preferences:
- Education Level: ${data.educationLevel}
- Academic Stream: ${data.academicStream}
- Specific Majors: ${data.specificMajors.join(', ')}
- Program Preference: ${data.programPreference}
- Location: ${data.location.country} / ${data.location.state} / ${data.location.city} — details: ${data.location.freeText}
- Budget (annual): ₹${data.budget.selected.toLocaleString()}
- College Type: ${data.collegeType.join(', ')}
- Entrance Exams: ${data.exams.map(e => `${e.name}: ${e.score}`).join(', ')}
- Dream College Description: ${data.dreamCollegeDescription}
- Additional Notes: ${data.additionalInfo}

Return results as a JSON object with:
1. ranked_colleges: array of objects with name, location, type, fit_score (0-100), fees_estimate, strengths, weaknesses, why_it_fits
2. summary: string with key insights and recommendations
3. next_steps: array of actionable items

Focus on institutions that match the user's stated preferences and budget range.`;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Generate AI prompt
      const prompt = generateAIPrompt(formData);
      console.log('Generated AI Prompt:', prompt);
      
      // Simulate API call - replace with actual AI service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Recommendations Generated!",
        description: "Your personalized college recommendations are ready.",
      });
      
      setShowResults(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (showResults) {
    return <CollegeRecommendations formData={formData} onBack={() => setShowResults(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-hero text-foreground mb-2">Find Your Dream College</h1>
          <p className="text-muted-foreground">Answer a few questions to get AI-powered recommendations</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Step {currentStep + 1} of {totalSteps}</span>
            <span className="text-sm text-muted-foreground">{Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Content */}
        <Card className="p-8 mb-6">
          <FormStep
            step={currentStep}
            formData={formData}
            updateFormData={updateFormData}
          />
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-8"
          >
            Previous
          </Button>

          {currentStep === totalSteps - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-8 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {isLoading ? 'Generating Recommendations...' : 'Get My Recommendations'}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="px-8 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}