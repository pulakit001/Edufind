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
      <SidebarContent className="p-2 sm:p-3 md:p-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4 sm:mb-6 min-w-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-foreground rounded-lg flex items-center justify-center flex-shrink-0">
            <Brain className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-background" />
          </div>
          {open && (
            <div className="min-w-0 flex-1">
              <h2 className="text-sm sm:text-base md:text-lg font-bold text-foreground truncate">EduMatch</h2>
              <p className="text-xs text-muted-foreground truncate">Intelligent Matching</p>
            </div>
          )}
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2 sm:space-y-3">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onViewChange(item.id)}
                    className={`w-full p-3 sm:p-4 md:p-5 rounded-lg transition-all duration-200 text-left min-h-[60px] sm:min-h-[70px] md:min-h-[80px] ${
                      activeView === item.id
                        ? 'bg-foreground text-background'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center w-full min-w-0 gap-2 sm:gap-3">
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                      {open && (
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm sm:text-base md:text-lg leading-tight truncate">{item.title}</div>
                          <div className="text-xs sm:text-sm opacity-80 leading-tight truncate mt-1">{item.subtitle}</div>
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