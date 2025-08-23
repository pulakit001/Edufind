import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, X, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

export function CollegeComparison() {
  const [colleges, setColleges] = useState<CollegeInput[]>([
    { id: '1', name: '' },
    { id: '2', name: '' },
    { id: '3', name: '' }
  ]);
  const [metrics, setMetrics] = useState<ComparisonMetric[]>(defaultMetrics);
  const [customMetric, setCustomMetric] = useState('');
  const [comparisonPrompt, setComparisonPrompt] = useState<string>('');
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
    
    return `You are an expert education consultant. Compare the following colleges based on the selected metrics:

Colleges: ${collegeNames.join(', ')}
Metrics: ${selectedMetrics.join(', ')}

Return a detailed comparison table with normalized scores and a concise summary explaining which college is better for which metric. Include pros and cons for each college.

Format the response as:
1. Comparison table with ratings/values for each metric
2. Summary paragraph highlighting key differences
3. Recommendations based on different student priorities`;
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
      setComparisonPrompt(prompt);

      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Comparison Prompt Generated!",
        description: "You can now copy this prompt to use with ChatGPT or other AI services.",
      });

    } catch (error) {
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
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-hero text-foreground mb-2">Compare Colleges</h1>
          <p className="text-sm sm:text-base text-muted-foreground px-4">Add up to 3 colleges and select comparison metrics</p>
        </div>

        {!comparisonPrompt ? (
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
                {isLoading ? 'Generating Prompt...' : 'Generate Comparison Prompt'}
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Generated Prompt Display */}
            <Card className="p-4 sm:p-6 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-lg sm:text-section-title">Generated Comparison Prompt</h2>
                <Button 
                  onClick={() => setComparisonPrompt('')}
                  variant="outline"
                  size="sm"
                >
                  New Comparison
                </Button>
              </div>

              <div className="bg-muted/30 p-4 sm:p-6 rounded-lg border border-border">
                <pre className="whitespace-pre-wrap text-xs sm:text-sm text-foreground font-mono leading-relaxed overflow-x-auto">
                  {comparisonPrompt}
                </pre>
              </div>
              
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs sm:text-sm text-yellow-800">
                  <strong>Instructions:</strong> Copy this prompt and paste it into ChatGPT, Claude, or any other AI service to get detailed college comparisons. The AI will analyze your selected colleges and metrics to provide comprehensive recommendations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
                <Button 
                  onClick={() => navigator.clipboard.writeText(comparisonPrompt)}
                  variant="outline"
                  className="flex-1"
                >
                  Copy Prompt
                </Button>
                <Button 
                  onClick={() => setComparisonPrompt('')}
                  variant="outline"
                  className="flex-1"
                >
                  Generate New Prompt
                </Button>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}