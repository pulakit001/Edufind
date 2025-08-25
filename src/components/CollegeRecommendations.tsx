import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, MapPin, DollarSign, TrendingUp, Users, Book } from "lucide-react";
import type { FormData } from "./CollegeFinderForm";

interface CollegeRecommendationsProps {
  formData: FormData;
  aiResponse: string;
  onBack: () => void;
}

const generateAIPrompt = (formData: FormData): string => {
  return `You are "AdmissionsSense" — an expert global university admissions consultant, career advisor, and data analyst. You synthesize program fit from user's preferences, compute normalized fit scores, and produce actionable recommendations.

Based on the following user preferences, recommend the top 10 colleges that best match their profile:

Education Level: ${formData.educationLevel}
Academic Stream: ${formData.academicStream}
Specific Majors: ${formData.specificMajors.join(', ')}
Program Preference: ${formData.programPreference}
Location: ${formData.location.country}${formData.location.state ? ', ' + formData.location.state : ''}${formData.location.city ? ', ' + formData.location.city : ''}
Location Details: ${formData.location.freeText}
Budget (Annual): ₹${formData.budget.selected.toLocaleString()}
College Type Preferences: ${formData.collegeType.join(', ')}
Entrance Exams: ${formData.exams.map(exam => `${exam.name}: ${exam.score}`).join(', ')}
Dream College Description: ${formData.dreamCollegeDescription}
Additional Information: ${formData.additionalInfo}

Please provide detailed recommendations with:
1. College name and location
2. Fit score (0-100) with reasoning
3. Estimated annual fees
4. Why it matches the user's preferences
5. Required entrance exams
6. Strengths and considerations
7. Suggested next steps

Format the response as a comprehensive analysis with actionable recommendations.`;
};

export function CollegeRecommendations({ formData, aiResponse, onBack }: CollegeRecommendationsProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 text-sm sm:text-base">
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Back to Form</span>
            <span className="sm:hidden">Back</span>
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl md:text-hero font-bold text-foreground">Your College Recommendations</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">AI-generated recommendations based on your preferences</p>
          </div>
        </div>

        {/* Summary Card */}
        <Card className="p-4 sm:p-6 md:p-8 mb-6 sm:mb-8 border border-border bg-card">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-foreground rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-background" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold">Your Preferences Summary</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-3 sm:p-4 bg-muted/50 rounded-lg">
              <span className="text-xs sm:text-sm text-muted-foreground block mb-1">Education Level</span>
              <div className="font-semibold text-sm sm:text-base">{formData.educationLevel}</div>
            </div>
            <div className="p-3 sm:p-4 bg-muted/50 rounded-lg">
              <span className="text-xs sm:text-sm text-muted-foreground block mb-1">Academic Stream</span>
              <div className="font-semibold text-sm sm:text-base">{formData.academicStream}</div>
            </div>
            <div className="p-3 sm:p-4 bg-muted/50 rounded-lg">
              <span className="text-xs sm:text-sm text-muted-foreground block mb-1">Budget</span>
              <div className="font-semibold text-sm sm:text-base">₹{formData.budget.selected.toLocaleString()}</div>
            </div>
            <div className="p-3 sm:p-4 bg-muted/50 rounded-lg">
              <span className="text-xs sm:text-sm text-muted-foreground block mb-1">Majors</span>
              <div className="font-semibold text-sm sm:text-base">{formData.specificMajors.length} selected</div>
            </div>
          </div>
        </Card>

        {/* AI Recommendations Display */}
        <Card className="p-4 sm:p-6 md:p-8 border border-border bg-card">
          <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">AI Recommendations:</h3>
          <div className="bg-muted/30 p-4 sm:p-6 rounded-lg border border-border">
            <div className="prose prose-sm sm:prose-base max-w-none text-foreground">
              {aiResponse ? (
                <pre className="whitespace-pre-wrap text-xs sm:text-sm text-foreground leading-relaxed overflow-x-auto">
                  {aiResponse}
                </pre>
              ) : (
                <p className="text-muted-foreground">No recommendations generated yet.</p>
              )}
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
          <Button onClick={onBack} variant="outline" className="flex-1 py-3 text-sm sm:text-base">
            Refine Preferences
          </Button>
          <Button 
            onClick={() => window.print()} 
            className="flex-1 bg-foreground text-background hover:bg-foreground/90 py-3 text-sm sm:text-base"
          >
            Print Recommendations
          </Button>
        </div>
      </div>
    </div>
  );
}