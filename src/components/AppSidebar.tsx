import { Search, BarChart3 } from "lucide-react";
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
    icon: Search,
    description: 'AI-powered college recommendations'
  },
  {
    id: 'comparison' as const,
    title: 'Compare Colleges',
    icon: BarChart3,
    description: 'Side-by-side college comparison'
  }
];

export function AppSidebar({ activeView, onViewChange }: AppSidebarProps) {
  return (
    <Sidebar className="w-64 border-r border-border">
      <SidebarContent className="p-4">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground">CollegeFinder AI</h2>
          <p className="text-sm text-muted-foreground mt-1">Plan your future</p>
        </div>
        
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onViewChange(item.id)}
                    className={`w-full flex items-start p-4 rounded-lg transition-all duration-200 ${
                      activeView === item.id
                        ? 'bg-accent text-accent-foreground border-l-4 border-accent'
                        : 'hover:bg-muted text-foreground'
                    }`}
                  >
                    <item.icon className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-left">
                      <div className="font-medium text-sm">{item.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {item.description}
                      </div>
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