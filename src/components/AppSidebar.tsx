import { Search, BarChart3, Brain, TrendingUp } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  activeView: 'finder' | 'comparison';
  onViewChange: (view: 'finder' | 'comparison') => void;
}

const navigationItems = [
  {
    id: 'finder' as const,
    title: 'Find Your Dream College',
    subtitle: 'AI-powered recommendations',
    icon: Search,
    description: 'Smart matching algorithm',
    badge: 'AI'
  },
  {
    id: 'comparison' as const,
    title: 'Compare Colleges',
    subtitle: 'Side-by-side analysis', 
    icon: BarChart3,
    description: 'Detailed metrics comparison',
    badge: 'Analytics'
  }
];

export function AppSidebar({ activeView, onViewChange }: AppSidebarProps) {
  return (
    <Sidebar className="sidebar-enhanced w-80 border-r-2 border-border/40">
      <SidebarContent className="p-6">
        {/* Enhanced Brand Header */}
        <div className="mb-12 text-center">
          <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Brain className="w-8 h-8 text-accent-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">CollegeFinder AI</h2>
          <p className="text-sm text-muted-foreground mt-1">Intelligent College Matching</p>
          <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-accent/10 rounded-full border border-accent/20">
            <TrendingUp className="w-3 h-3 text-accent" />
            <span className="text-xs font-medium text-accent">Advanced AI</span>
          </div>
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-4">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onViewChange(item.id)}
                    className={`nav-item w-full p-6 rounded-2xl transition-all duration-300 border-2 ${
                      activeView === item.id
                        ? 'active bg-accent text-accent-foreground border-accent shadow-xl transform scale-105'
                        : 'border-border/30 hover:border-accent/30 hover:bg-muted/60 text-foreground hover:transform hover:translate-x-2'
                    }`}
                  >
                    <div className="flex items-start w-full">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-all duration-300 ${
                        activeView === item.id 
                          ? 'bg-accent-foreground/20' 
                          : 'bg-accent/10'
                      }`}>
                        <item.icon className={`w-6 h-6 ${
                          activeView === item.id ? 'text-accent-foreground' : 'text-accent'
                        }`} />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between mb-1">
                          <div className="font-bold text-base">{item.title}</div>
                          <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            activeView === item.id 
                              ? 'bg-accent-foreground/20 text-accent-foreground' 
                              : 'bg-accent/20 text-accent'
                          }`}>
                            {item.badge}
                          </div>
                        </div>
                        <div className={`text-sm mb-2 ${
                          activeView === item.id ? 'text-accent-foreground/80' : 'text-muted-foreground'
                        }`}>
                          {item.subtitle}
                        </div>
                        <div className={`text-xs ${
                          activeView === item.id ? 'text-accent-foreground/60' : 'text-muted-foreground/80'
                        }`}>
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Enhanced Stats */}
        <div className="mt-12 p-6 bg-muted/30 rounded-2xl border border-border/40">
          <h4 className="font-bold text-sm text-foreground mb-4">Your Progress</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Preferences Analyzed</span>
              <span className="text-xs font-bold text-accent">100%</span>
            </div>
            <div className="w-full bg-border/40 rounded-full h-2">
              <div className="bg-accent h-2 rounded-full w-full"></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Matches Found: 12</span>
              <span>Comparisons: 3</span>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}