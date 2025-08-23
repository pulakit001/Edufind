import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, MapPin, DollarSign, TrendingUp, Users, Book } from "lucide-react";
import type { FormData } from "./CollegeFinderForm";

interface CollegeRecommendationsProps {
  formData: FormData;
  onBack: () => void;
}

// Mock data - replace with actual AI recommendations
const mockRecommendations = [
  {
    name: "Indian Institute of Technology, Bombay",
    location: "Mumbai, Maharashtra, India",
    type: "Government / Public University",
    fitScore: 92,
    feesEstimate: "₹2,50,000",
    strengths: ["World-class faculty", "Excellent placements", "Strong alumni network"],
    weaknesses: ["Highly competitive", "Limited social life"],
    whyItFits: "Perfect match for Computer Science with excellent research opportunities and industry connections in Mumbai's tech hub.",
    requiredExams: "JEE Advanced",
    nextSteps: ["Prepare for JEE Advanced", "Apply for scholarships", "Visit campus if possible"]
  },
  {
    name: "BITS Pilani",
    location: "Pilani, Rajasthan, India", 
    type: "Private University",
    fitScore: 87,
    feesEstimate: "₹4,00,000",
    strengths: ["Industry partnerships", "Flexible curriculum", "Strong placement record"],
    weaknesses: ["Higher fees", "Remote location"],
    whyItFits: "Excellent for AI/Data Science with industry-oriented curriculum and strong startup culture.",
    requiredExams: "BITSAT",
    nextSteps: ["Register for BITSAT", "Apply for fee concessions", "Connect with current students"]
  },
  {
    name: "National Institute of Technology, Surathkal",
    location: "Karnataka, India",
    type: "Government / Public University", 
    fitScore: 85,
    feesEstimate: "₹1,80,000",
    strengths: ["Coastal campus", "Good research facilities", "Affordable fees"],
    weaknesses: ["Limited industry exposure", "Language barriers"],
    whyItFits: "Great balance of quality education and affordability, with proximity to Bangalore tech ecosystem.",
    requiredExams: "JEE Main",
    nextSteps: ["Improve JEE Main score", "Research specializations", "Apply for hostel accommodation"]
  }
];

export function CollegeRecommendations({ formData, onBack }: CollegeRecommendationsProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Form
          </Button>
          <div>
            <h1 className="text-hero text-foreground">Your College Recommendations</h1>
            <p className="text-muted-foreground">AI-powered matches based on your preferences</p>
          </div>
        </div>

        {/* Summary Card */}
        <Card className="p-6 mb-8 bg-accent/5 border-accent/20">
          <h2 className="text-section-title mb-4">Recommendation Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Education Level:</span>
              <div className="font-medium">{formData.educationLevel}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Preferred Stream:</span>
              <div className="font-medium">{formData.academicStream}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Budget Range:</span>
              <div className="font-medium">₹{formData.budget.selected.toLocaleString()}</div>
            </div>
          </div>
        </Card>

        {/* Recommendations */}
        <div className="space-y-6">
          {mockRecommendations.map((college, index) => (
            <Card key={index} className="college-card">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Main Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-card-title text-foreground mb-1">{college.name}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <MapPin className="w-4 h-4" />
                        {college.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="w-4 h-4 text-accent" />
                        <span className="font-semibold text-accent">{college.fitScore}% Match</span>
                      </div>
                      <Badge variant="outline">{college.type}</Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{college.whyItFits}</p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{college.feesEstimate}/year</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Book className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{college.requiredExams}</span>
                    </div>
                  </div>

                  {/* Strengths & Weaknesses */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-success mb-2">Strengths</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {college.strengths.map((strength, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-success rounded-full" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-warning mb-2">Considerations</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {college.weaknesses.map((weakness, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-warning rounded-full" />
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Next Steps */}
                  <div>
                    <h4 className="font-medium mb-2">Suggested Next Steps</h4>
                    <div className="flex flex-wrap gap-2">
                      {college.nextSteps.map((step, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{step}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="lg:w-48 space-y-3">
                  <Button className="w-full" variant="outline">
                    Learn More
                  </Button>
                  <Button className="w-full" variant="outline">
                    Add to Comparison
                  </Button>
                  <Button className="w-full" variant="outline">
                    Save to Shortlist
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-border">
          <Button onClick={onBack} variant="outline" className="flex-1">
            Refine Preferences
          </Button>
          <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
            Compare Selected Colleges
          </Button>
        </div>
      </div>
    </div>
  );
}