import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, MapPin, DollarSign, TrendingUp, Users, Book } from "lucide-react";
import type { FormData } from "./CollegeFinderForm";

interface CollegeRecommendationsProps {
  formData: FormData;
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

export function CollegeRecommendations({ formData, onBack }: CollegeRecommendationsProps) {
  const aiPrompt = generateAIPrompt(formData);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center gap-6 mb-12">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back to Form
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground">AI Generated Prompt</h1>
            <p className="text-muted-foreground mt-2">Here's the prompt that would be sent to the AI based on your preferences</p>
          </div>
        </div>

        {/* Summary Card */}
        <Card className="p-8 mb-8 border border-border bg-card">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-foreground rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-background" />
            </div>
            <h2 className="text-xl font-bold">Your Preferences Summary</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground block mb-1">Education Level</span>
              <div className="font-semibold">{formData.educationLevel}</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground block mb-1">Academic Stream</span>
              <div className="font-semibold">{formData.academicStream}</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground block mb-1">Budget</span>
              <div className="font-semibold">₹{formData.budget.selected.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <span className="text-sm text-muted-foreground block mb-1">Majors</span>
              <div className="font-semibold">{formData.specificMajors.length} selected</div>
            </div>
          </div>
        </Card>

        {/* AI Prompt Display */}
        <Card className="p-8 border border-border bg-card">
          <h3 className="text-lg font-bold mb-4">Generated AI Prompt:</h3>
          <div className="bg-muted/30 p-6 rounded-lg border border-border">
            <pre className="whitespace-pre-wrap text-sm text-foreground font-mono leading-relaxed">
              {aiPrompt}
            </pre>
          </div>
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> This prompt would be sent to an AI service (like OpenAI, Claude, etc.) to generate personalized college recommendations based on your preferences. The AI would analyze your requirements and return a list of suitable colleges with detailed explanations.
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button onClick={onBack} variant="outline" className="flex-1">
            Refine Preferences
          </Button>
          <Button className="flex-1 bg-foreground text-background hover:bg-foreground/90">
            Send to AI (Not Implemented)
          </Button>
        </div>
      </div>
    </div>
  );
}