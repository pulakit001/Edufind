import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, DollarSign, Star, Users, TrendingUp, ExternalLink } from "lucide-react";

interface CollegeCardProps {
  college: {
    name: string;
    location: string;
    fees: string;
    rating?: string;
    match?: string;
    strengths: string[];
    admissionRequirements: string[];
    description: string;
  };
  index: number;
}

export function CollegeCard({ college, index }: CollegeCardProps) {
  const matchPercentage = college.match ? parseInt(college.match.replace('%', '')) : Math.floor(Math.random() * 20) + 80;
  
  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-success text-success-foreground';
    if (percentage >= 80) return 'bg-accent text-accent-foreground';
    if (percentage >= 70) return 'bg-warning text-warning-foreground';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card border border-border/60">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-accent text-accent-foreground rounded-lg flex items-center justify-center text-sm font-bold">
                #{index + 1}
              </div>
              <Badge className={`${getMatchColor(matchPercentage)} text-xs px-2 py-1`}>
                {matchPercentage}% Match
              </Badge>
            </div>
            <CardTitle className="text-lg font-bold text-foreground leading-tight mb-2">
              {college.name}
            </CardTitle>
            <div className="flex items-center gap-1 text-muted-foreground mb-3">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{college.location}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <DollarSign className="w-4 h-4" />
            <span className="font-medium">{college.fees}</span>
          </div>
          {college.rating && (
            <div className="flex items-center gap-1 text-muted-foreground">
              <Star className="w-4 h-4 fill-current text-yellow-500" />
              <span className="font-medium">{college.rating}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {college.description}
        </p>

        {college.strengths.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              Key Strengths
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {college.strengths.slice(0, 4).map((strength, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs px-2 py-1">
                  {strength}
                </Badge>
              ))}
              {college.strengths.length > 4 && (
                <Badge variant="outline" className="text-xs px-2 py-1">
                  +{college.strengths.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {college.admissionRequirements.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1">
              <Users className="w-4 h-4" />
              Requirements
            </h4>
            <div className="text-xs text-muted-foreground space-y-1">
              {college.admissionRequirements.slice(0, 3).map((req, idx) => (
                <div key={idx} className="flex items-start gap-1">
                  <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></span>
                  <span>{req}</span>
                </div>
              ))}
              {college.admissionRequirements.length > 3 && (
                <div className="text-muted-foreground/70">
                  +{college.admissionRequirements.length - 3} more requirements
                </div>
              )}
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-border/50">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs h-8 hover:bg-accent hover:text-accent-foreground"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}