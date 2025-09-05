import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, X, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CollegeCard } from "@/components/CollegeCard";
import { parseAIResponse } from "@/utils/parseAIResponse";

interface CollegeComparisonProps {
  onSwitchToFinder?: () => void;
}

interface CollegeInput {
  id: string;
  name: string;
}

interface ComparisonMetric {
  id: string;
  name: string;
  selected: boolean;
}

const defaultMetrics: ComparisonMetric[] = [
  { id: 'fees', name: 'Tuition Fees', selected: true },
  { id: 'campus', name: 'Campus Facilities', selected: true },
  { id: 'placements', name: 'Placements & Packages', selected: true },
  { id: 'faculty', name: 'Student-Faculty Ratio', selected: false },
  { id: 'research', name: 'Research Opportunities', selected: false },
  { id: 'exchange', name: 'International Exchange Programs', selected: false },
  { id: 'ranking', name: 'University Rankings', selected: false },
  { id: 'alumni', name: 'Alumni Network', selected: false },
  { id: 'location', name: 'Location & Accessibility', selected: false },
  { id: 'diversity', name: 'Campus Diversity', selected: false }
];

// Removed mock comparison data

export function CollegeComparison({ onSwitchToFinder }: CollegeComparisonProps = {}) {
  const [colleges, setColleges] = useState<CollegeInput[]>([
    { id: '1', name: '' },
    { id: '2', name: '' },
    { id: '3', name: '' }
  ]);
  const [metrics, setMetrics] = useState<ComparisonMetric[]>(defaultMetrics);
  const [customMetric, setCustomMetric] = useState('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const updateCollegeName = (id: string, name: string) => {
    setColleges(prev => prev.map(college => 
      college.id === id ? { ...college, name } : college
    ));
  };

  const addCustomMetric = () => {
    if (customMetric) {
      setMetrics(prev => [...prev, {
        id: customMetric.toLowerCase().replace(/\s+/g, '_'),
        name: customMetric,
        selected: true
      }]);
      setCustomMetric('');
    }
  };

  const toggleMetric = (id: string) => {
    setMetrics(prev => prev.map(metric =>
      metric.id === id ? { ...metric, selected: !metric.selected } : metric
    ));
  };

  const generateComparisonPrompt = (): string => {
    const collegeNames = colleges.filter(c => c.name).map(c => c.name);
    const selectedMetrics = metrics.filter(m => m.selected).map(m => m.name);
    
    return `You are a College Comparison Expert! Compare these colleges based on the selected metrics:

Colleges: ${collegeNames.join(', ')}
Comparison Metrics: ${selectedMetrics.join(', ')}

Please provide:
1. Detailed comparison table with ratings (1-10) for each metric
2. Pros and cons for each college
3. Cost comparison and value for money analysis
4. Which college is best for different student profiles
5. Final recommendations with reasoning

Make it comprehensive but easy to understand!`;
  };

  const handleCompare = async () => {
    const filledColleges = colleges.filter(c => c.name.trim());
    const selectedMetrics = metrics.filter(m => m.selected);

    if (filledColleges.length < 2) {
      toast({
        title: "Error",
        description: "Please add at least 2 colleges to compare.",
        variant: "destructive",
      });
      return;
    }

    if (selectedMetrics.length === 0) {
      toast({
        title: "Error", 
        description: "Please select at least one comparison metric.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Generate comparison prompt
      const prompt = generateComparisonPrompt();
      console.log('Generated AI Prompt:', prompt);
      
      // Call Groq AI via Supabase Edge Function
      const response = await fetch('https://shsmqlvrafnkywrbgtur.supabase.co/functions/v1/generate-college-comparison', {
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
        throw new Error(result.error || 'Failed to generate comparison');
      }
      
      setAiResponse(result.comparison);
      
      toast({
        title: "Comparison Expert has analyzed! 🎓",
        description: "Your detailed college comparison is ready.",
      });
      
      setShowResults(true);
    } catch (error) {
      console.error('Error calling Groq API:', error);
      toast({
        title: "Error",
        description: "Failed to generate comparison. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-6">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2">Compare Colleges</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Add up to 3 colleges and select comparison metrics</p>
          </div>
          {onSwitchToFinder && (
            <Button variant="outline" onClick={onSwitchToFinder} className="text-sm">
              Find Colleges
            </Button>
          )}
        </div>

        {!showResults ? (
          <>
            {/* College Inputs */}
            <Card className="p-6 mb-6">
              <h2 className="text-section-title mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Colleges to Compare
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4">
                {colleges.map((college, index) => (
                  <div key={college.id}>
                    <Label htmlFor={`college-${college.id}`} className="text-sm">College {index + 1}</Label>
                    <Input
                      id={`college-${college.id}`}
                      placeholder="Enter college name"
                      value={college.name}
                      onChange={(e) => updateCollegeName(college.id, e.target.value)}
                      className="mt-1"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Tip: You can compare 2-3 colleges for best results
              </div>
            </Card>

            {/* Comparison Metrics */}
            <Card className="p-6 mb-6">
              <h2 className="text-section-title mb-4">Comparison Metrics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 mb-4">
                {metrics.map(metric => (
                  <div key={metric.id} className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded">
                    <Checkbox 
                      checked={metric.selected}
                      onCheckedChange={() => toggleMetric(metric.id)}
                    />
                    <label className="text-sm cursor-pointer flex-1">{metric.name}</label>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Input 
                  placeholder="Add custom metric"
                  value={customMetric}
                  onChange={(e) => setCustomMetric(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={addCustomMetric} size="icon" variant="outline" className="w-10 h-10 sm:w-auto sm:h-auto sm:px-3">
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline ml-1">Add</span>
                </Button>
              </div>
            </Card>

            {/* Compare Button */}
            <div className="text-center px-4">
              <Button 
                onClick={handleCompare}
                disabled={isLoading}
                className="w-full sm:w-auto px-8 sm:px-12 py-3 bg-accent text-accent-foreground hover:bg-accent/90"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin"></div>
                    <span className="hidden sm:inline">Generating Comparison...</span>
                    <span className="sm:hidden">Generating...</span>
                  </div>
                ) : (
                  <>
                    <span className="hidden sm:inline">Get AI College Comparison ✨</span>
                    <span className="sm:hidden">Get Comparison ✨</span>
                  </>
                )}
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* College Cards Results */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">College Comparison Results</h2>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {colleges.filter(c => c.name).map(college => (
                      <Badge key={college.id} variant="secondary" className="text-sm px-3 py-1">
                        {college.name}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Comparison Metrics: </span>
                    <span className="text-foreground font-medium">{metrics.filter(m => m.selected).map(m => m.name).join(', ')}</span>
                  </div>
                </div>
                <Button 
                  onClick={() => setShowResults(false)}
                  variant="outline"
                  size="sm"
                >
                  ← Back to Form
                </Button>
              </div>

              {/* AI Results in Single Card */}
              <Card className="p-6 mb-8 bg-card border border-border/60">
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-foreground leading-relaxed text-sm">
                    {aiResponse}
                  </div>
                </div>
              </Card>
            </div>

            {/* Raw AI Response (Collapsible) */}
            <Card className="p-4 sm:p-6 bg-muted/20">
              <details className="group">
                <summary className="cursor-pointer text-lg font-bold mb-4 text-foreground flex items-center justify-between">
                  <span>Full Comparison Analysis</span>
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
                  Print Results
                </Button>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}