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
      <div className="max-w-5xl mx-auto p-4 sm:p-6 md:p-8">
        {/* Enhanced Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-4 sm:mb-6">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            <span className="text-xs sm:text-sm font-medium text-accent">AI-Powered College Matching</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-hero text-foreground mb-3 sm:mb-4">Find Your Dream College</h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Our advanced AI will analyze your preferences to recommend the perfect colleges for your future
          </p>
        </div>

        {/* Enhanced Progress Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-base sm:text-lg font-bold text-foreground">Step {currentStep + 1}</span>
              <span className="text-sm text-muted-foreground">of {totalSteps}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-muted-foreground">Progress:</span>
              <span className="text-sm sm:text-lg font-bold text-accent">{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
            </div>
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="relative">
            <div className="w-full bg-muted rounded-2xl h-2 sm:h-3 shadow-inner">
              <div 
                className="bg-gradient-to-r from-accent to-primary h-2 sm:h-3 rounded-2xl transition-all duration-500 shadow-md" 
                style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
              />
            </div>
            <div className="absolute top-0 left-0 w-full h-2 sm:h-3 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl"></div>
          </div>
          
          {/* Step Indicators */}
          <div className="flex justify-between mt-4 sm:mt-6">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  i < currentStep 
                    ? 'bg-accent border-accent text-accent-foreground' 
                    : i === currentStep 
                    ? 'bg-accent/20 border-accent text-accent animate-pulse' 
                    : 'bg-muted border-muted-foreground/30 text-muted-foreground'
                }`}
              >
                <span className="text-xs font-bold">{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Form Content */}
        <div className="relative">
          <Card className="shadow-xl border-2 border-border/30 p-4 sm:p-6 md:p-8 lg:p-10 mb-6 sm:mb-8 bg-gradient-to-br from-card to-muted/10">
            <FormStep
              step={currentStep}
              formData={formData}
              updateFormData={updateFormData}
            />
          </Card>
        </div>

        {/* Enhanced Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base rounded-xl sm:rounded-2xl border-2 border-border/60 hover:border-accent/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </Button>

          <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground">
            <span>Step {currentStep + 1} of {totalSteps}</span>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}% Complete</span>
          </div>

          {currentStep === totalSteps - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 text-sm sm:text-base btn-gradient rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin"></div>
                  <span className="hidden sm:inline">Generating Recommendations...</span>
                  <span className="sm:hidden">Generating...</span>
                </div>
              ) : (
                <>
                  <span className="hidden sm:inline">Get My Recommendations ✨</span>
                  <span className="sm:hidden">Get Recommendations ✨</span>
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base btn-gradient rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Next →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}