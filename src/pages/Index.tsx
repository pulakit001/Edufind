import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-sky-50 to-emerald-50">
      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="text-xl sm:text-2xl font-bold text-gray-900">
              EduFind
            </div>
            
            <nav className="hidden sm:flex items-center gap-8">
              <a href="#" className="text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors">
                home
              </a>
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-700 transition-colors">
                contact
              </a>
              <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-700 transition-colors">
                about
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-100/40 via-sky-100/40 to-emerald-100/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-8 py-20 sm:py-32">
          <div className="text-center space-y-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-violet-200/50">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-medium text-violet-700">Next-Generation College Matching</span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 leading-tight max-w-5xl mx-auto">
                Discover your perfect college with{" "}
                <span className="bg-gradient-to-r from-violet-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  AI precision
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
                Tell our AI about your goals, <span className="text-violet-600 font-medium">dream degree</span>, and preferences, and get personalized college 
                recommendations in minutes—tailored just for you
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button 
                onClick={() => navigate('/dashboard')}
                className="px-8 py-4 text-lg bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                size="lg"
              >
                <Sparkles className="w-5 h-5 mr-2 text-violet-600" />
                Find my college
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
