import { Search, BarChart3, Brain, TrendingUp } from "lucide-react";

interface AppBottomNavProps {
  activeView: 'finder' | 'comparison';
  onViewChange: (view: 'finder' | 'comparison') => void;
}

const navigationItems = [
  {
    id: 'finder' as const,
    title: 'Find Colleges',
    icon: Search,
    description: 'AI-powered recommendations'
  },
  {
    id: 'comparison' as const,
    title: 'Compare',
    icon: BarChart3,
    description: 'Side-by-side analysis'
  }
];

export function AppBottomNav({ activeView, onViewChange }: AppBottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border backdrop-blur-lg bg-card/95">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-around">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 px-2 py-2 rounded-xl transition-all duration-200 ${
                activeView === item.id
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <item.icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium truncate">{item.title}</span>
            </button>
          ))}
        </div>
        
        {/* App branding at bottom */}
        <div className="flex items-center justify-center mt-3 pt-2 border-t border-border/50">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 bg-foreground rounded flex items-center justify-center">
              <Brain className="w-3 h-3 text-background" />
            </div>
            <span className="text-xs font-bold text-foreground">EduMatch</span>
          </div>
        </div>
      </div>
    </div>
  );
}