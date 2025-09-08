import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormStep } from "@/components/FormStep";
import { CollegeRecommendations } from "@/components/CollegeRecommendations";
import { useToast } from "@/hooks/use-toast";

export interface FormData {
  actionType: 'match' | 'compare' | '';
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

interface CollegeFinderFormProps {
  onSwitchToComparison?: () => void;
}

const initialFormData: FormData = {
  actionType: '',
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

export function CollegeFinderForm({ onSwitchToComparison }: CollegeFinderFormProps = {}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const totalSteps = 11;

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Handle action type selection
    if (field === 'actionType') {
      if (value === 'compare' && onSwitchToComparison) {
        onSwitchToComparison();
        return;
      }
      // If match is selected, continue to next step
      if (value === 'match') {
        handleNext();
      }
    }
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
    const examsInfo = data.exams.length > 0 ? data.exams.map(e => `${e.name}: ${e.score}`).join(', ') : 'None specified';
    const majorsInfo = data.specificMajors.length > 0 ? data.specificMajors.join(', ') : 'Open to options';
    const collegeTypesInfo = data.collegeType.length > 0 ? data.collegeType.join(', ') : 'Any type';
    const locationInfo = [data.location.country, data.location.state, data.location.city].filter(Boolean).join(', ') || 'Flexible';
    
    return `You are a College Genie! Give me the top 5 colleges based on these preferences:

Education: ${data.educationLevel} | Stream: ${data.academicStream} | Majors: ${majorsInfo} | Program: ${data.programPreference}
Location: ${locationInfo} ${data.location.freeText ? `(${data.location.freeText})` : ''}
Budget: ₹${data.budget.selected.toLocaleString()}/year | College Type: ${collegeTypesInfo}
Exams: ${examsInfo} | Dream College: ${data.dreamCollegeDescription || 'Open minded'}
Additional: ${data.additionalInfo || 'None'}

Please provide:
1. Top 5 college recommendations with name, location, and why it matches
2. Estimated fees for each
3. Admission requirements
4. Key strengths of each college
5. Next steps for applications

Make it comprehensive but concise!`;
  };

  const [aiResponse, setAiResponse] = useState<string>('');

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Generate compressed AI prompt
      const prompt = generateAIPrompt(formData);
      console.log('Generated AI Prompt:', prompt);
      
      // Call Groq AI via Supabase Edge Function
      const response = await fetch('https://shsmqlvrafnkywrbgtur.supabase.co/functions/v1/generate-college-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to generate recommendations');
      }
      
      setAiResponse(result.recommendation);
      
      toast({
        title: "College Genie has spoken! 🧞‍♂️",
        description: "Your personalized college recommendations are ready.",
      });
      
      setShowResults(true);
    } catch (error) {
      console.error('Error calling Groq API:', error);
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
    return <CollegeRecommendations formData={formData} aiResponse={aiResponse} onBack={() => setShowResults(false)} />;
  }

  // First question - minimalist fullscreen layout
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="w-full max-w-2xl mx-auto p-6 sm:p-8">
          <FormStep
            step={currentStep}
            formData={formData}
            updateFormData={updateFormData}
          />
        </div>
      </div>
    );
  }

  // Regular form layout for other steps
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Find Your Dream College</h1>
            <p className="text-sm text-muted-foreground">AI-powered recommendations</p>
          </div>
          {onSwitchToComparison && (
            <Button variant="outline" onClick={onSwitchToComparison} className="text-sm">
              Compare Colleges
            </Button>
          )}
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
          <Card className="shadow-2xl border-0 p-6 sm:p-8 md:p-10 lg:p-12 mb-6 sm:mb-8 bg-white dark:bg-gray-900 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 to-purple-50/50 dark:from-violet-950/20 dark:to-purple-950/20"></div>
            <div className="relative z-10">
              <FormStep
                step={currentStep}
                formData={formData}
                updateFormData={updateFormData}
              />
            </div>
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
              disabled={currentStep === 0 && !formData.actionType}
              className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base btn-gradient rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {currentStep === 0 ? (formData.actionType ? 'Continue →' : 'Choose an option') : 'Next →'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
