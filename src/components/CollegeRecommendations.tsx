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
      <div className="max-w-7xl mx-auto p-8">
        {/* Enhanced Header */}
        <div className="flex items-center gap-6 mb-12">
          <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 p-4 rounded-2xl hover:bg-muted/60 transition-all duration-300">
            <ArrowLeft className="w-5 h-5" />
            Back to Form
          </Button>
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-4">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-accent">AI Analysis Complete</span>
            </div>
            <h1 className="text-hero text-foreground leading-tight">Your Perfect College Matches</h1>
            <p className="text-xl text-muted-foreground mt-2">Discover institutions tailored specifically for your goals and preferences</p>
          </div>
        </div>

        {/* Enhanced Summary Card */}
        <Card className="feature-card p-8 mb-12 bg-gradient-to-br from-accent/5 via-card to-muted/10 border-2 border-accent/20">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-accent-foreground" />
            </div>
            <h2 className="text-section-title">Recommendation Summary</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-base">
            <div className="p-4 bg-card/60 rounded-xl border border-border/40">
              <span className="text-muted-foreground text-sm block mb-1">Education Level</span>
              <div className="font-bold text-accent">{formData.educationLevel}</div>
            </div>
            <div className="p-4 bg-card/60 rounded-xl border border-border/40">
              <span className="text-muted-foreground text-sm block mb-1">Preferred Stream</span>
              <div className="font-bold text-accent">{formData.academicStream}</div>
            </div>
            <div className="p-4 bg-card/60 rounded-xl border border-border/40">
              <span className="text-muted-foreground text-sm block mb-1">Budget Range</span>
              <div className="font-bold text-accent">₹{formData.budget.selected.toLocaleString()}</div>
            </div>
            <div className="p-4 bg-card/60 rounded-xl border border-border/40">
              <span className="text-muted-foreground text-sm block mb-1">Matches Found</span>
              <div className="font-bold text-accent">{mockRecommendations.length} Colleges</div>
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