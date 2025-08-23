import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Target, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-accent" />
              <h1 className="text-lg font-semibold text-foreground">CollegeFinder AI</h1>
            </div>
            <div className="text-sm text-muted-foreground">
              Made with ❤️ for students
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-hero text-foreground leading-tight">
              Find your perfect college
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AI-powered recommendations tailored to your goals, budget, and dreams. 
              Discover the college that's right for you in minutes.
            </p>
          </div>

          <Button 
            onClick={() => navigate('/dashboard')}
            className="px-8 py-6 text-lg bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            size="lg"
          >
            Find your dream college
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          {/* Feature Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 pt-16 border-t border-border">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">Smart Recommendations</h3>
              <p className="text-muted-foreground text-sm">
                Answer 10 simple questions and get personalized college recommendations 
                based on your preferences, budget, and career goals.
              </p>
            </div>
            
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">Compare Colleges</h3>
              <p className="text-muted-foreground text-sm">
                Compare up to 3 colleges side-by-side across multiple metrics 
                like fees, placements, campus life, and more.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
