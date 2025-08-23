import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useState } from "react";
import { CollegeFinderForm } from "@/components/CollegeFinderForm";
import { CollegeComparison } from "@/components/CollegeComparison";

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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;