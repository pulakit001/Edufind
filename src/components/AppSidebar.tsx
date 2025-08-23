import { Search, BarChart3, Brain, TrendingUp, Menu } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
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
  const { open } = useSidebar();
  
  return (
    <Sidebar className="border-r border-border bg-card">
      <SidebarContent className="p-3 sm:p-4">
        {/* Header with Toggle */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-foreground rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 sm:w-6 sm:h-6 text-background" />
            </div>
            {open && (
              <div>
                <h2 className="text-base sm:text-lg font-bold text-foreground">CollegeFinder AI</h2>
                <p className="text-xs text-muted-foreground">Intelligent Matching</p>
              </div>
            )}
          </div>
          <SidebarTrigger className="h-6 w-6 sm:h-8 sm:w-8" />
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onViewChange(item.id)}
                    className={`w-full p-3 sm:p-4 rounded-lg transition-all duration-200 text-left ${
                      activeView === item.id
                        ? 'bg-foreground text-background'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center w-full min-w-0">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                      {open && (
                        <div className="ml-2 sm:ml-3 text-left min-w-0 flex-1">
                          <div className="font-medium text-sm sm:text-base truncate">{item.title}</div>
                          <div className="text-xs opacity-80 truncate">{item.subtitle}</div>
                        </div>
                      )}
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}