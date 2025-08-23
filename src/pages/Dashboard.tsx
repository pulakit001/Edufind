import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useState } from "react";
import { CollegeFinderForm } from "@/components/CollegeFinderForm";
import { CollegeComparison } from "@/components/CollegeComparison";
import { Menu } from "lucide-react";

const Dashboard = () => {
  const [activeView, setActiveView] = useState<'finder' | 'comparison'>('finder');

  const renderContent = () => {
    switch (activeView) {
      case 'finder':
        return <CollegeFinderForm />;
      case 'comparison':
        return <CollegeComparison />;
      default:
        return <CollegeFinderForm />;
    }
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-background">
        {/* Always visible sidebar trigger */}
        <div className="fixed top-4 left-4 z-50">
          <SidebarTrigger className="h-10 w-10 bg-card border border-border shadow-md hover:bg-accent rounded-lg flex items-center justify-center">
            <Menu className="h-5 w-5" />
          </SidebarTrigger>
        </div>
        
        <AppSidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 overflow-auto">
          <div className="w-full min-h-screen pt-16 px-4 sm:pt-4 sm:px-0">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;