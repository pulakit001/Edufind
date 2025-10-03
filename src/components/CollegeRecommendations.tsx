import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Printer, Sparkles } from "lucide-react";
import { FormData } from "./CollegeFinderForm";
import { CollegeCard } from "./CollegeCard";
import { parseAIResponse } from "@/utils/parseAIResponse";

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
  const parsedColleges = parseAIResponse(aiResponse);

  return (
    <div className="min-h-screen bg-background pb-6">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-accent" />
              Your Perfect Matches
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">AI-powered college recommendations just for you</p>
          </div>
          <Button 
            onClick={onBack}
            variant="outline"
            className="self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Form
          </Button>
        </div>

        {/* Preferences Summary */}
        <Card className="p-4 sm:p-6 mb-6 sm:mb-8 bg-gradient-to-br from-card to-muted/30">
          <h2 className="text-lg font-bold mb-4 text-foreground">Your Search Criteria</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm">
            <div className="flex flex-col">
              <span className="font-medium text-foreground">Education Level</span>
              <span className="text-muted-foreground">{formData.educationLevel}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-foreground">Academic Stream</span>
              <span className="text-muted-foreground">{formData.academicStream}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-foreground">Budget Range</span>
              <span className="text-muted-foreground">{formData.currency.symbol}{formData.budget.selected.toLocaleString()}/year ({formData.currency.code})</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-foreground">Preferred Location</span>
              <span className="text-muted-foreground">
                {[formData.location.country, formData.location.state, formData.location.city].filter(Boolean).join(', ') || 'Flexible'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-foreground">Program Type</span>
              <span className="text-muted-foreground">{formData.programPreference}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-foreground">College Type</span>
              <span className="text-muted-foreground">{formData.collegeType.join(', ') || 'Any'}</span>
            </div>
          </div>
          
          {formData.specificMajors.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border/50">
              <span className="font-medium text-foreground block mb-2">Interested Majors</span>
              <div className="flex flex-wrap gap-2">
                {formData.specificMajors.map((major, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {major}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* AI Results in Single Card */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-6 text-foreground">Top College Recommendations</h2>
          <Card className="p-8 bg-card border border-border/60 shadow-sm">
            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-foreground leading-loose text-base space-y-6"
                   dangerouslySetInnerHTML={{
                     __html: aiResponse
                       .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>')
                       .replace(/\*(.*?)\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
                       .replace(/(\d+\.\s*[^\n]+)/g, '<div class="mb-6 p-4 bg-muted/30 rounded-lg border-l-4 border-primary">$1</div>')
                       .replace(/(Location:|Why it matches:|Fees:|Admission Requirements:|Annual Fees:|Estimated Fees:|Required Exams:|Strengths:|Considerations:)/gi, '<br><strong class="text-primary font-semibold">$1</strong><br>')
                       .replace(/\n\n/g, '<br><br>')
                       .replace(/\n/g, '<br>')
                   }}>
              </div>
            </div>
          </Card>
        </div>

        {/* Raw AI Response (Collapsible) */}
        <Card className="p-4 sm:p-6 bg-muted/20">
          <details className="group">
            <summary className="cursor-pointer text-lg font-bold mb-4 text-foreground flex items-center justify-between">
              <span>Full AI Analysis</span>
              <span className="text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="bg-muted/30 p-4 sm:p-6 rounded-lg border border-border">
              <pre className="whitespace-pre-wrap text-xs sm:text-sm text-foreground leading-relaxed overflow-x-auto">
                {aiResponse}
              </pre>
            </div>
          </details>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button 
              onClick={() => navigator.clipboard.writeText(aiResponse)}
              variant="outline"
              className="flex-1"
            >
              Copy Full Analysis
            </Button>
            <Button 
              onClick={() => window.print()}
              variant="outline"
              className="flex-1"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print Results
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}