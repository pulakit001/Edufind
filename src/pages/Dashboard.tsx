import { useState } from "react";
import { CollegeFinderForm } from "@/components/CollegeFinderForm";
import { CollegeComparison } from "@/components/CollegeComparison";

const Dashboard = () => {
  const [activeView, setActiveView] = useState<'finder' | 'comparison'>('finder');

  const renderContent = () => {
    switch (activeView) {
      case 'finder':
        return <CollegeFinderForm onSwitchToComparison={() => setActiveView('comparison')} />;
      case 'comparison':
        return <CollegeComparison onSwitchToFinder={() => setActiveView('finder')} />;
      default:
        return <CollegeFinderForm onSwitchToComparison={() => setActiveView('comparison')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="w-full min-h-screen">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;