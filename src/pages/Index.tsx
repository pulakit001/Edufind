import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Target, BarChart3, Zap, Brain, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glassmorphism border-b border-border/30">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">CollegeFinder AI</h1>
                <p className="text-xs text-muted-foreground">Powered by Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>Trusted by 10,000+ students</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        <div className="relative max-w-6xl mx-auto px-8 py-24">
          <div className="text-center space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-accent">Next-Generation College Matching</span>
              </div>
              
              <h1 className="text-hero text-foreground leading-tight max-w-4xl mx-auto">
                Discover your perfect college with{" "}
                <span className="relative">
                  <span className="relative z-10">AI precision</span>
                  <div className="absolute inset-0 bg-accent/20 -skew-x-12 transform"></div>
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Advanced AI algorithms analyze your preferences, goals, and potential to match you 
                with colleges that align perfectly with your dreams and budget.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => navigate('/dashboard')}
                className="px-10 py-6 text-lg btn-gradient rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                size="lg"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline"
                className="px-8 py-6 text-lg rounded-2xl border-2 border-accent/20 hover:border-accent/40 transition-all duration-300"
                size="lg"
              >
                Watch Demo
              </Button>
            </div>

            {/* Enhanced Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-20 border-t border-border/50">
              <div className="feature-card text-center group">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-all duration-300">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Precision Matching</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI analyzes 50+ factors including academic performance, career aspirations, 
                  location preferences, and budget to find your ideal college matches.
                </p>
              </div>
              
              <div className="feature-card text-center group">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-all duration-300">
                  <BarChart3 className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Smart Comparison</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Compare colleges across multiple dimensions with detailed analytics, 
                  placement statistics, and ROI calculations for informed decisions.
                </p>
              </div>

              <div className="feature-card text-center group">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-all duration-300">
                  <Sparkles className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-4">Personalized Insights</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get customized recommendations, scholarship opportunities, and 
                  actionable next steps tailored specifically for your profile.
                </p>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 pt-8 border-t border-border/30">
              <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>10,000+ Successful Matches</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>500+ College Partners</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>98% Satisfaction Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
