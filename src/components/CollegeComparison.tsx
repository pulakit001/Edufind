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

// Mock comparison data
const mockComparisonData = {
  "IIT Bombay": {
    fees: "₹2.5L / year",
    campus: "★★★★★",
    placements: "35 LPA avg",
    faculty: "1:8",
    research: "Excellent",
    exchange: "Available",
    ranking: "Top 3 in India",
    alumni: "Exceptional",
    location: "Mumbai - Urban",
    diversity: "High"
  },
  "BITS Pilani": {
    fees: "₹4L / year", 
    campus: "★★★★☆",
    placements: "20 LPA avg",
    faculty: "1:12",
    research: "Good",
    exchange: "Limited",
    ranking: "Top 10 in India",
    alumni: "Strong",
    location: "Pilani - Remote",
    diversity: "Moderate"
  },
  "NIT Trichy": {
    fees: "₹1.8L / year",
    campus: "★★★☆☆", 
    placements: "14 LPA avg",
    faculty: "1:15",
    research: "Moderate",
    exchange: "Not Available",
    ranking: "Top 15 in India",
    alumni: "Good",
    location: "Trichy - Town",
    diversity: "Moderate"
  }
};

export function CollegeComparison() {
  const [colleges, setColleges] = useState<CollegeInput[]>([
    { id: '1', name: '' },
    { id: '2', name: '' },
    { id: '3', name: '' }
  ]);
  const [metrics, setMetrics] = useState<ComparisonMetric[]>(defaultMetrics);
  const [customMetric, setCustomMetric] = useState('');
  const [comparisonResults, setComparisonResults] = useState<any>(null);
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
      console.log('Generated Comparison Prompt:', prompt);

      // Simulate API call - replace with actual AI service
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock results using our sample data
      const results = filledColleges.reduce((acc, college) => {
        const collegeName = college.name;
        const collegeData = mockComparisonData[collegeName as keyof typeof mockComparisonData];
        
        if (collegeData) {
          acc[collegeName] = collegeData;
        } else {
          // Generate mock data for unknown colleges
          acc[collegeName] = {
            fees: "₹3L / year",
            campus: "★★★☆☆", 
            placements: "18 LPA avg",
            faculty: "1:12",
            research: "Good",
            exchange: "Available",
            ranking: "Regional",
            alumni: "Moderate",
            location: "Urban",
            diversity: "Moderate"
          };
        }
        return acc;
      }, {} as any);

      setComparisonResults({
        colleges: results,
        summary: "Based on the comparison, each college has unique strengths. IIT Bombay leads in placements and research, BITS Pilani offers good industry exposure, while NIT Trichy provides excellent value for money."
      });

      toast({
        title: "Comparison Complete!",
        description: "Your college comparison is ready.",
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
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-hero text-foreground mb-2">Compare Colleges</h1>
          <p className="text-muted-foreground">Add up to 3 colleges and select comparison metrics</p>
        </div>

        {!comparisonResults ? (
          <>
            {/* College Inputs */}
            <Card className="p-6 mb-6">
              <h2 className="text-section-title mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Colleges to Compare
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {colleges.map((college, index) => (
                  <div key={college.id}>
                    <Label htmlFor={`college-${college.id}`}>College {index + 1}</Label>
                    <Input
                      id={`college-${college.id}`}
                      placeholder="Enter college name"
                      value={college.name}
                      onChange={(e) => updateCollegeName(college.id, e.target.value)}
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
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {metrics.map(metric => (
                  <div key={metric.id} className="flex items-center space-x-2">
                    <Checkbox 
                      checked={metric.selected}
                      onCheckedChange={() => toggleMetric(metric.id)}
                    />
                    <label className="text-sm">{metric.name}</label>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input 
                  placeholder="Add custom metric"
                  value={customMetric}
                  onChange={(e) => setCustomMetric(e.target.value)}
                />
                <Button onClick={addCustomMetric} size="icon" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Compare Button */}
            <div className="text-center">
              <Button 
                onClick={handleCompare}
                disabled={isLoading}
                className="px-12 py-3 bg-accent text-accent-foreground hover:bg-accent/90"
                size="lg"
              >
                {isLoading ? 'Comparing Colleges...' : 'Compare Now'}
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Comparison Results */}
            <Card className="p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-section-title">Comparison Results</h2>
                <Button 
                  onClick={() => setComparisonResults(null)}
                  variant="outline"
                >
                  New Comparison
                </Button>
              </div>

              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-medium">Metric</th>
                      {Object.keys(comparisonResults.colleges).map(college => (
                        <th key={college} className="text-left p-3 font-medium">{college}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.filter(m => m.selected).map(metric => (
                      <tr key={metric.id} className="border-b border-border hover:bg-muted/50">
                        <td className="p-3 font-medium">{metric.name}</td>
                        {Object.keys(comparisonResults.colleges).map(college => (
                          <td key={college} className="p-3">
                            {comparisonResults.colleges[college][metric.id] || 'N/A'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* AI Summary */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">AI Analysis Summary</h3>
              <p className="text-muted-foreground leading-relaxed">
                {comparisonResults.summary}
              </p>
              
              <div className="mt-6 space-y-4">
                <h4 className="font-medium">Key Recommendations:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <h5 className="font-medium text-success mb-2">Best for Placements</h5>
                    <p className="text-sm text-muted-foreground">IIT Bombay with 35 LPA average package</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h5 className="font-medium text-accent mb-2">Best Value for Money</h5>
                    <p className="text-sm text-muted-foreground">NIT Trichy with excellent ROI</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <h5 className="font-medium text-warning mb-2">Best Industry Exposure</h5>
                    <p className="text-sm text-muted-foreground">BITS Pilani with strong corporate ties</p>
                  </div>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}